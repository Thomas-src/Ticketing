import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/types/RootStackParamList';
import ScreenModeView from "./src/presentation/context/ScreenModeContext";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from "./src/presentation/components/TabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <ScreenModeView>
            <SafeAreaProvider>
                <NavigationContainer>
                    <TabNavigator/>
                </NavigationContainer>
            </SafeAreaProvider>
        </ScreenModeView>
    );
}