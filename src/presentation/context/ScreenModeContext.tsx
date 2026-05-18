import {createContext, ReactNode, useMemo, useState} from "react";

type ScreenModeContextType = {
    screenMode: boolean;
    setScreenMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ScreenModeContext = createContext<ScreenModeContextType | undefined>(undefined);

export default function ScreenModeView({children}: { children: ReactNode | ReactNode[] }) {
    const [screenMode, setScreenMode] = useState(false);
    const value = useMemo(() => ({screenMode, setScreenMode}), [screenMode]);
    return (
        <ScreenModeContext.Provider value={value}>
            {children}
        </ScreenModeContext.Provider>
    );
}