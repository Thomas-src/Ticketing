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
        paddingHorizontal: 6,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        width: 'auto',
        alignItems: 'center',
    },
    tag: {
        fontSize: 12,
        color: colors.lightBlue,
        padding: 2,
        borderRadius: 5,
        backgroundColor: 'white',
        textAlign: 'center',
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
        paddingHorizontal: 8,
        width: '60%',
    },
    ecTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
    ecDate: {
        color: 'white',
    },
    eclocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    ecLocation: {
        marginTop: 8,
        color: 'white',
        marginLeft: 6,
    },
    pinIcon: {
        color: 'white',
    },
    ecContainerBut: {
        maxWidth: '100%',
        width: '40%',
        maxHeight: 200,
        padding: 6,
        justifyContent: 'space-between'
    },
    ecButtonContainer: {
        padding: 3,
        width: '100%',
        alignItems: 'flex-end',
    },
    ecTagsContainer: {
        alignItems: 'flex-end',
    }
});
