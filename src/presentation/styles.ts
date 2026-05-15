import {StyleSheet} from 'react-native';
import {colors} from "./colors";

export const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
    flexGrow: {
        flexGrow: 1
    },
    colorRed: {
        color: colors.red
    },
    alignCenter: {
        alignItems: 'center',
    },
    link: {
        color: 'white',
        textAlign: 'center',
        marginTop: 15,
        textDecorationLine: 'underline',
    },
    label: {fontWeight: 'bold', marginBottom: 5, color: colors.white},
    input: {
        borderWidth: 1,
        color: colors.white,
        borderColor: colors.white,
        padding: 12,
        marginBottom: 15,
        width: '100%',
        borderRadius: 8,
    },
    rectangle: {
        flex: 1,
        padding: 20,
        marginBottom: 20,
        backgroundColor: colors.blue,
        borderRadius: 10,
        alignItems: 'stretch',
        color: colors.white,
    },
    rectangleTitle: {
        fontSize: 16,
        color: colors.white,
    },
    spaceBtw: {
        justifyContent: 'space-between',
    },
    spaceRound: {
        justifyContent: 'space-around',
    },
    center: {
        textAlign: 'center',
        marginTop: 80,
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
        color: colors.darkBlue,
        padding: 2,
        borderRadius: 5,
        backgroundColor: 'white',
        textAlign: 'center',
    },
    buttonText: {
        color: colors.darkBlue,
        fontWeight: 'bold',
    },

    debugBorder: {
        borderWidth: 1,
        borderColor: 'red'
    },
    screen: {
        flex: 1,
    },
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
        backgroundColor: colors.darkBlue,
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
        width: "100%",
        height: 150,
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
        color: colors.white,
        fontWeight: 'bold',
    },
    ecDate: {
        color: colors.white,
    },
    eclocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonWhiteText: {
        color: 'white',
    },
    ecLocation: {
        marginTop: 8,
        color: 'white',
        marginLeft: 6,
    },
    settingCard: {
        width: "100%",
        marginVertical: 8,
    },
    settingButton: {
        height: 68,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: colors.darkBlue,
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
