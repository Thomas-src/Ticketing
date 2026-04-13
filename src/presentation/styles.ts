import { StyleSheet } from 'react-native';

const lightBlue = "#51A2FF"

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
  debugBorder: {
    borderWidth: 1,
    borderColor: 'red'
  },
  button: {
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 'auto',
    alignItems: 'center',
  },
  buttonText: {
    color: lightBlue,
    fontWeight: 'bold',
  },
  screen: {

  },
  pageTitle: {
    padding: 8,
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  eventCard: {
    backgroundColor: lightBlue,
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
    flexDirection:"row",
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
    width: '40%',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  ecButtonContainer: {
    width: '65%',
  }
});
