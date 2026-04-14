import {StyleSheet} from 'react-native';
import {colors} from "./colors";

export const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
    spaceBtw: {
        justifyContent: 'space-between',
    },
    spaceRound: {
        justifyContent: 'space-around',
    },
    button: {
        padding: 6,
        backgroundColor: 'white',
        borderRadius: 8,
        width: 'auto',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.lightBlue,
        fontWeight: 'bold',
    },

    debugBorder: {
        borderWidth: 1,
        borderColor: 'red'
    },
    screen: {},
    title: {
        fontSize: 16,
    },
    container: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    tabBarItemStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ticketIcon: {
        position: 'absolute',
        top: -48,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageTitle: {
        padding: 8,
        fontSize: 24,
        fontWeight: "bold",
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    eventCard: {
        backgroundColor: colors.lightBlue,
        width: '90%',
        margin: 'auto',
        borderRadius: 16,
        overflow: 'hidden',
    },
    ecimageContainer: {
        width: "100%",
        height: 150,
    },

    image: {
        maxWidth: "100%",
        maxHeight: "100%",
    },
    ecContentContainer: {
        display: "flex",
        flexDirection: "row",
    },
    ecContainerInf: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: '60%',
    },
    ecTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
    ecDate: {
        color: 'white',
    },
    ecLocation: {
        marginTop: 8,
        color: 'white',
    },
    ecContainerBut: {
        maxWidth: '100%',
        width: '40%',
        maxHeight: 200,
        paddingVertical: 8,
        paddingHorizontal: 6,
    },
    ecButtonContainer: {
        padding: 16,
        width: '65%',
    }
});
