
import { Switch, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from '@/styles/styles';
import { useCallback, useContext } from 'react';
import { ScreenModeContext } from '@/context/ScreenModeContext';

export default function Settings() {
    const { screenMode, setScreenMode } = useContext(ScreenModeContext);

    const switchValueChange = useCallback(() => {
        setScreenMode(!screenMode);
        console.log("Change value screen mode " + screenMode)
    }, [screenMode])

    return (
        <View style={styles.container}>
            <View style={styles.containerHorizontal}>
                <Text>Screen Mode : </Text>
                <Switch onValueChange={switchValueChange}
                    value={screenMode} />
            </View>
        </View>
    );
}
