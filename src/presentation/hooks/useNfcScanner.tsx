import {useCallback, useRef, useState} from 'react';
import {Vibration} from 'react-native';
import {VerifyResult} from "../../types/ScreenType";
import {useInjection} from './ioc.react';
import VerifyTickets from '../../application/usecase/VerifyTickets';

// Import conditionnel du NFC
let NfcManager: any = null;
let NfcTech: any = null;
try {
    const nfc = require('react-native-nfc-manager');
    NfcManager = nfc.default;
    NfcTech = nfc.NfcTech;
} catch (e) {
    console.warn('[NFC] react-native-nfc-manager non disponible dans cet environnement');
}

export type NfcStatus = 'idle' | 'scanning' | 'unsupported';

const NFC_TECHNOLOGIES = NfcTech ? [NfcTech.Ndef, NfcTech.NfcA] : [];

function decodeNdefTextPayload(payload: number[]): string {
    const langCodeLength = payload[0] & 0x3f;
    const textBytes = payload.slice(1 + langCodeLength);
    return textBytes.map(c => String.fromCharCode(c)).join('');
}

export function useNfcScanner(eventId: string) {
    const verifyTicketUseCase = useInjection<VerifyTickets>(VerifyTickets);

    const [result, setResult] = useState<VerifyResult | null>(null);
    const [nfcStatus, setNfcStatus] = useState<NfcStatus>(
        NfcManager ? 'idle' : 'unsupported'
    );

    const scanningLock = useRef(false);

    const scan = useCallback(async () => {
        // NFC non disponible dans Expo Go
        if (!NfcManager) {
            console.warn('[NFC] Non disponible dans Expo Go');
            return;
        }

        if (scanningLock.current) return;

        setNfcStatus('scanning');
        let tag: any | null = null;

        for (const tech of NFC_TECHNOLOGIES) {
            try {
                await NfcManager.cancelTechnologyRequest();
                await NfcManager.requestTechnology(tech, {
                    alertMessage: 'Approchez le ticket NFC',
                });

                tag = await NfcManager.getTag();
                if (tag) break;

            } catch (e: any) {
                console.log('[NFC] tech failed:', tech, e?.message ?? e);
            } finally {
                await NfcManager.cancelTechnologyRequest().catch(() => {});
            }
        }

        if (!tag) {
            setNfcStatus('idle');
            return;
        }

        scanningLock.current = true;
        Vibration.vibrate(200);

        const ndefPayload = tag.ndefMessage?.[0]?.payload;
        const token = ndefPayload ? decodeNdefTextPayload(ndefPayload) : (tag.id ?? '');

        console.log('[NFC] verify eventId:', eventId, 'token:', token);

        try {
            const res = await verifyTicketUseCase.execute(eventId, token);
            console.log('[NFC] Res eventId:', res);
            setResult(res);
        } catch {
            setResult({ok: false, reason: "error"});
        } finally {
            setNfcStatus('idle');
        }
    }, [eventId, verifyTicketUseCase]);

    const resetScan = useCallback(() => {
        setResult(null);
        setTimeout(() => {
            scanningLock.current = false;
        }, 800);
    }, []);

    const cancel = useCallback(async () => {
        if (!NfcManager) return;
        await NfcManager.cancelTechnologyRequest().catch(() => {});
        setNfcStatus('idle');
    }, []);

    return {result, nfcStatus, scan, cancel, resetScan};
}