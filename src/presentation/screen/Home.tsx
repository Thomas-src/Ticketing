import {FlatList, Text, TextInput, View} from 'react-native';
import {styles} from '../styles';
import EventCard from "../components/EventCard";
import {useAuth} from "../context/AuthContext";
import GetAvaiblesEvents from "../../application/usecase/GetAvaiblesEvents";
import {Event} from "../../domain/core/Event";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useInjection} from "../hooks/ioc.react";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types/RootStackParamList";
import {Search} from 'lucide-react-native';
import {colors} from "../colors"

const getMessage = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour ";
    if (hour < 18) return "Bon après-midi ";
    return "Bonsoir ";
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
    const avaiblesEvents = useInjection<GetAvaiblesEvents>(GetAvaiblesEvents);
    const navigation = useNavigation<NavigationProp>();

    const {user} = useAuth();
    const date = useRef(new Date()).current;
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Recherche
    const [searchInput, setSearchInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const loadEvents = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) setRefreshing(true);
            else setLoading(true);
            setError(null);
            const result = await avaiblesEvents.execute(date);
            setEvents(result);
        } catch (e: unknown) {
            console.error(e);
            if (e instanceof Error) setError(e.message);
            else setError("Une erreur inconnue est survenue");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [avaiblesEvents, date]);

    const handleRefresh = useCallback(() => {
        loadEvents(true);
    }, [loadEvents]);

    const navigateToDetails = useCallback((eventId: string) => {
        navigation.navigate("Details", {eventId});
    }, [navigation]);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    const filteredEvents = useMemo(() => {
        const q = searchInput.trim().toLowerCase();
        if (!q) return events;

        return events.filter(event =>
            event.title.toLowerCase().includes(q) ||
            event.address.address.toLowerCase().includes(q)
        );
    }, [events, searchInput]);
    const openSearch = useCallback(() => setIsSearching(true), []);
    if (loading) {
        return (
            <View style={styles.screen}>
                <Text>Chargement...</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.screen}>
                <Text style={{color: "red"}}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingBottom: 16,
                paddingTop: 8,
            }}>
                {isSearching ? (
                    <TextInput
                        autoFocus={true} // Permet d'afficher directement le clavier quand on clique
                        value={searchInput}
                        onChangeText={setSearchInput}
                        placeholder="Entrez le nom..."
                        placeholderTextColor={colors.black}
                        // Permet que lorsque qu'on clique autre par sur l'écran quand l'input est vide, ca désactive la recherche
                        // L'idée vient de claude.ai
                        onBlur={() => {
                            if (!searchInput) setIsSearching(false);
                        }}
                        style={{
                            flex: 1,
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: colors.black,
                            borderBottomWidth: 2,
                            borderBottomColor: colors.blue,
                            paddingVertical: 4,
                            marginRight: 12,
                        }}
                    />
                ) : (
                    <Text style={[styles.pageTitle, {flex: 1, paddingBottom: 0, paddingHorizontal: 0, paddingTop: 0}]}>
                        {getMessage() + (user?.name ?? "")}
                    </Text>
                )}

                <View
                    onTouchEnd={openSearch}
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: colors.blue,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Search size={20} color="white"/>
                </View>
            </View>

            <FlatList
                data={filteredEvents}
                keyExtractor={(item: Event) => item.id}
                renderItem={({item}) => (
                    <EventCard event={item} actionName="Réserver" action={() => navigateToDetails(item.id)}/>
                )}
                contentContainerStyle={{gap: 12}}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={
                    searchInput ? (
                        <Text style={{color: colors.black, textAlign: 'center', marginTop: 40}}>
                            Aucun résultats pour : "{searchInput}"
                        </Text>
                    ) : null
                }
            />
        </View>
    );
}