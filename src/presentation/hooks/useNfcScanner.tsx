import {useCallback, useEffect, useRef, useState} from 'react';
import {Vibration} from 'react-native';
import NfcManager, {NfcTech, TagEvent} from 'react-native-nfc-manager';
import VerifyTickets from '../../application/usecase/VerifyTickets';
import {useInjection} from './ioc.react';

type ScanResult = null | {
    ok: boolean;
    message: string;
};

export type NfcStatus = 'scanning' | 'unsupported';

const NFC_TECHNOLOGIES = [
    NfcTech.Ndef,
    NfcTech.NfcA,
];

let loopRunning = false;

export function useNfcScanner(eventId: string) {
    const verifyTicketUseCase = useInjection<VerifyTickets>(VerifyTickets);

    const [result, setResult] = useState<ScanResult>(null);
    const [nfcStatus, setNfcStatus] = useState<NfcStatus>('scanning');

    const activeRef = useRef(false);
    const scanningLock = useRef(false);

    const eventIdRef = useRef(eventId);
    const verifyRef = useRef(verifyTicketUseCase);
    useEffect(() => {
        eventIdRef.current = eventId;
    }, [eventId]);
    useEffect(() => {
        verifyRef.current = verifyTicketUseCase;
    }, [verifyTicketUseCase]);

    const handleTagScanned = useCallback(async (tag: TagEvent) => {
        if (scanningLock.current) return;
        scanningLock.current = true;

        const ndefPayload = tag.ndefMessage?.[0]?.payload;
        const token = ndefPayload ? String.fromCharCode(...ndefPayload) : (tag.id ?? '');

        console.log('[NFC] verify eventId:', eventIdRef.current, 'token:', token);

        try {
            const res = await verifyRef.current.execute(eventIdRef.current, token);
            setResult({
                ok: res,
                message: res ? 'Ticket valide ✅' : 'Ticket invalide ❌',
            });
        } catch {
            setResult({ok: false, message: 'Erreur de vérification ❌'});
        }
    }, []);

    const resetScan = useCallback(() => {
        setResult(null);
        setTimeout(() => {
            scanningLock.current = false;
        }, 800);
    }, []);

    useEffect(() => {
        if (loopRunning) return;

        activeRef.current = true;
        loopRunning = true;

        (async () => {
            try {
                const supported = await NfcManager.isSupported();
                if (!supported) {
                    setNfcStatus('unsupported');
                    return;
                }

                await NfcManager.start();

                while (activeRef.current) {
                    let tag: TagEvent | null = null;

                    for (const tech of NFC_TECHNOLOGIES) {
                        if (!activeRef.current) break;

                        try {
                            await NfcManager.cancelTechnologyRequest();
                            await NfcManager.requestTechnology(tech, {
                                alertMessage: 'Approchez le ticket NFC',
                            });

                            tag = await NfcManager.getTag();
                            if (tag) break;

                        } catch (e: any) {
                            if (e?.message?.includes('cancelled') || e?.message?.includes('canceled')) break;
                            console.log('[NFC] tech failed:', tech, e?.message ?? e);
                            console.log(e)
                        } finally {
                            await NfcManager.cancelTechnologyRequest().catch(() => {
                            });
                        }
                    }

                    if (!activeRef.current) break;

                    if (tag) {
                        Vibration.vibrate(200);
                        await handleTagScanned(tag);
                        await new Promise(r => setTimeout(r, 2000));
                    } else {
                        await new Promise(r => setTimeout(r, 600));
                    }
                }
            } finally {
                loopRunning = false;
            }
        })();

        return () => {
            activeRef.current = false;
            NfcManager.cancelTechnologyRequest().catch(() => {
            });
        };
    }, [handleTagScanned]);

    return {result, nfcStatus, resetScan};
}