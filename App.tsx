import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/RootStackParamList';
import Home from '@/screen/Home';
const Stack = createNativeStackNavigator<RootStackParamList>();

import ScreenModeView, { ScreenModeContext } from "@/context/ScreenModeContext";
export default function App() {
  return (
    <ScreenModeView>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    </ScreenModeView>
  );
}

