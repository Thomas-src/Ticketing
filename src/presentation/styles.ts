import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    pageTitle: {
        padding: 8,
        fontSize: 24,
        fontWeight: "bold",
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    eventCard: {
        backgroundColor: 'white',
        width: '90%',
        margin: 'auto'
    },
    eventCardImage: {
        maxWidth: '100%',
        maxHeight: 200,
    },
    eventCardTitle: {
        padding: 16,
    }
});
