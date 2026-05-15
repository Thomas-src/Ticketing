import {useCallback, useRef, useState} from "react";
import VerifyTickets from "../../application/usecase/VerifyTickets";
import {useInjection} from "./ioc.react";

type ScanResult = null | {
    ok: boolean;
    message: string;
};

export function useQrScanner(eventId: string) {
    const verifyTicketUseCase = useInjection<VerifyTickets>(VerifyTickets);

    const [result, setResult] = useState<ScanResult>(null);
    const scanningLock = useRef(false);

    const handleBarcodeScanned = useCallback(
        async ({data}: { data: string }) => {
            if (scanningLock.current) return;

            scanningLock.current = true;
            console.log("checking qr scanning " + eventId + " token :" + data);
            try {
                const res = await verifyTicketUseCase.execute(eventId, data);

                setResult({
                    ok: res,
                    message: res ? "Ticket valide ✅" : "Ticket invalide ❌",
                });
            } catch {
                setResult({
                    ok: false,
                    message: "Erreur de vérification ❌",
                });
            }
        },
        [eventId, verifyTicketUseCase]
    );

    const resetScan = useCallback(() => {
        setResult(null);

        setTimeout(() => {
            scanningLock.current = false;
        }, 800);
    }, []);

    return {
        result,
        handleBarcodeScanned,
        resetScan,
    };
}