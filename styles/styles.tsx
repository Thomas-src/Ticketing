import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 18,
    marginTop: 10,
  },
  section: {
    marginTop: 20,
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textbutton: {
    color: "white",
    fontWeight: "bold"
  },
  menubutton: {
    backgroundColor: "#2244dd",
    margin: 4,
    padding: 0,
    borderRadius: 4,
    alignItems: "center"
  },
  disabled: {
    backgroundColor: "#9090dd"
  }

});
