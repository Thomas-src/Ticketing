import {NavigationContainer} from '@react-navigation/native';
import ScreenModeView from "./src/presentation/context/ScreenModeContext";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from "./src/presentation/nav/RootNavigator";
import {AuthProvider} from "./src/presentation/context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <ScreenModeView>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <RootNavigator/>
                    </NavigationContainer>
                </SafeAreaProvider>
            </ScreenModeView>
        </AuthProvider>
    );
}