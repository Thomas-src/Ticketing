import {Text, View} from "react-native";

export function NoConnectionScreen() {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black"
        }}>
            <Text style={{color: "white", fontSize: 18}}>
                Pas de connexion internet
            </Text>

            <Text style={{color: "gray", marginTop: 10}}>
                En attente de réseau...
            </Text>
        </View>
    );
}