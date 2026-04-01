import { createContext, ReactNode, useState } from "react";

export const ScreenModeContext = createContext(false);

export default function ScreenModeView({children} : ReactNode | ReactNode[]) {
  const [screenMode, setScreenMode] = useState(false);

  return (
    <ScreenModeContext.Provider value={{screenMode, setScreenMode}}>
      {children}
    </ScreenModeContext.Provider>
  );
}