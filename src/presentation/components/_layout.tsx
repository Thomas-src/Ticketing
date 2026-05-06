import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from "../styles";
import {useNetworkStatus} from "../hooks/useNetworkStatus";
import {NoConnectionScreen} from "./NoConnectionScreen";

export default function Layout({children}: { children: React.ReactNode }) {
    const insets = useSafeAreaInsets();
    const {isConnected} = useNetworkStatus();

    if (!isConnected) {
        return <NoConnectionScreen/>;
    }

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                },
            ]}
        >
            {children}
        </View>
    );
}