import { createContext, ReactNode, useState } from "react";

type ScreenModeContextType = {
  screenMode: boolean;
  setScreenMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ScreenModeContext = createContext<ScreenModeContextType | undefined>(undefined);

export default function ScreenModeView({ children }: { children: ReactNode | ReactNode[] }) {
  const [screenMode, setScreenMode] = useState(false);

  return (
    <ScreenModeContext.Provider value={{ screenMode, setScreenMode }}>
      {children}
    </ScreenModeContext.Provider>
  );
}