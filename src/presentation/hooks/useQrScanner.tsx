import {useCallback, useRef, useState} from "react";
import VerifyTickets from "../../application/usecase/VerifyTickets";
import {useInjection} from "./ioc.react";
import {VerifyResult} from "../../types/ScreenType";


export function useQrScanner(eventId: string) {
    const verifyTicketUseCase = useInjection<VerifyTickets>(VerifyTickets);

    const [result, setResult] = useState<VerifyResult | null>(null);
    const scanningLock = useRef(false);

    const handleBarcodeScanned = useCallback(
        async ({data}: { data: string }) => {
            if (scanningLock.current) return;

            scanningLock.current = true;
            console.log("checking qr scanning " + eventId + " token :" + data);
            try {
                const res = await verifyTicketUseCase.execute(eventId, data);

                setResult(res);
            } catch {
                setResult({
                    ok: false,
                    reason: "error",
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