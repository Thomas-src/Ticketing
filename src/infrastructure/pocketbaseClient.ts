import PocketBase, {AsyncAuthStore} from "pocketbase";

import eventsource from 'react-native-sse';

import AsyncStorage from '@react-native-async-storage/async-storage';

// load the polyfill
(global as any).EventSource = eventsource;

// initialize the async store
const store = new AsyncAuthStore({
    save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
    initial: AsyncStorage.getItem('pb_auth'),
});


export const pb = new PocketBase('http://127.0.0.1:8090', store);