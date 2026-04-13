import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/RootStackParamList';
import Home from './screen/Home';
import Tickets from './screen/Tickets';
import Settings from './screen/Settings';
const Stack = createNativeStackNavigator<RootStackParamList>();

import ScreenModeView, { ScreenModeContext } from "./context/ScreenModeContext";
export default function App() {
  return (
    <ScreenModeView>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tickets" component={Tickets} />
        <Stack.Screen name="Settings" component={Tickets} />
      </Stack.Navigator>
    </NavigationContainer>
    </ScreenModeView>
  );
}

