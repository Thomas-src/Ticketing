import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/RootStackParamList';
import Home from '@/screen/Home';
import Settings from '@/screen/Setting';
import Game from '@/screen/Game';
import MenuButton from '@/components/MenuButton';
import Result from './screen/Result';
const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
          options={({ navigation }) => ({
            headerLeft: () => {
              return (
                <MenuButton
                  title="Paramètre"
                  onPress={() => { navigation.navigate("Settings") }}
                />
              );
            },
            headerRight: () => {
              return (
                <MenuButton
                  title="Résultat"
                  onPress={() => { navigation.navigate("Result") }}
                  disabled={true}
                />
              );
            }
          })} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

