
import { Switch, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from '@/styles/styles';
    import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';



export default function Setting() {
    const { isEnabled, setIsEnabled } = useContext(ThemeContext);

    const toggleSwitch = () => setIsEnabled(isEnabled => !isEnabled);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activer le mode clair</Text>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </SafeAreaView>
            </SafeAreaProvider>

        </View>
    );
}