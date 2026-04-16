import {NavigationContainer} from '@react-navigation/native';
import ScreenModeView from "./src/presentation/context/ScreenModeContext";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from "./src/presentation/nav/RootNavigator";

export default function App() {
    return (
        <ScreenModeView>
            <SafeAreaProvider>
                <NavigationContainer>
                    <RootNavigator/>
                </NavigationContainer>
            </SafeAreaProvider>
        </ScreenModeView>
    );
}