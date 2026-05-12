import "reflect-metadata";
import {NavigationContainer} from '@react-navigation/native';
import ScreenModeView from "./src/presentation/context/ScreenModeContext";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from "./src/presentation/nav/RootNavigator";
import {AuthProvider} from "./src/presentation/context/AuthContext";
import {IocProvider} from "./src/presentation/hooks/ioc.react"
import {container} from "./inversify.config";

export default function App() {
    return (
        <IocProvider container={container}>
            <AuthProvider>
                <ScreenModeView>
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <RootNavigator/>
                        </NavigationContainer>
                    </SafeAreaProvider>
                </ScreenModeView>
            </AuthProvider>
        </IocProvider>
    );
}