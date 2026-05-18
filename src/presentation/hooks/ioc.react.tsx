import React, {useContext, useMemo} from "react";
import {Container} from "inversify";
// Cette classe a été inspirée de https://codesandbox.io/p/sandbox/react-hooks-with-inversify-tmem7?file=%2Fsrc%2Fioc.react.tsx
const InversifyContext = React.createContext<{ container: Container | null }>({
    container: null,
});

type Props = React.PropsWithChildren<{
    container: Container;
}>;

export const IocProvider: React.FC<Props> = ({container, children}) => {
    const value = useMemo(() => ({container}), [container]);
    return (
        <InversifyContext.Provider value={value}>
            {children}
        </InversifyContext.Provider>
    );
};

export function useInjection<T>(identifier: new (...args: any[]) => T): T {
    const {container} = useContext(InversifyContext);

    if (!container) {
        throw new Error("Inversify container is missing");
    }

    return container.get<T>(identifier);
}