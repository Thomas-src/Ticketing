import { createContext } from 'react';

type ThemeContextType = {
    isEnabled: boolean;
    setIsEnabled: (value: boolean | ((prev: boolean) => boolean)) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    isEnabled: false,
    setIsEnabled: () => {}, // dummy function (required)
});