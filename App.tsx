import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/RootStackParamList';
import Home from './src/presentation/screen/Home';
import Tickets from './src/presentation/screen/Tickets';
import Settings from './src/presentation/screen/Settings';

const Stack = createNativeStackNavigator<RootStackParamList>();

import ScreenModeView, { ScreenModeContext } from "./src/presentation/context/ScreenModeContext";
import Footer from "./src/presentation/components/Footer";
export default function App() {
  return (
    <ScreenModeView>
      <NavigationContainer>
        <Footer />
      </NavigationContainer>
    </ScreenModeView>
  );
}

