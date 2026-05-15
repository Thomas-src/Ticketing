import PocketBase, {AsyncAuthStore} from "pocketbase";
import eventsource from 'react-native-sse';
import * as SecureStore from 'expo-secure-store';

(global as any).EventSource = eventsource;

const store = new AsyncAuthStore({
    save: async (serialized) => {
        await SecureStore.setItemAsync('pb_auth', serialized);
    },
    clear: async () => {
        await SecureStore.deleteItemAsync('pb_auth');
    },
    initial: SecureStore.getItemAsync('pb_auth'),
});

export const pb = new PocketBase("https://pocketbase.tomstudio.eu", store);