import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#fff',
},
  containerHorizontal: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e1e2f',
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
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  list: {
    width: '100%',
  },
  containerResult: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Ombre iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },

    // Ombre Android
    elevation: 3,
  },

  itemText: {
    fontSize: 18,
    color: '#333',
  },

  rank: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007AFF',
  },
  swipeContainer: {
    flex: 1,
    flexDirection: "row",
    width: 200,
    height: 30,
    marginTop: 50,
  },
  swipeItem: {
    height: 30,
    backgroundColor: "azure",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "slategrey",
  },
  swipeItemText: {
    textAlign: "center",
    color: "slategrey",
  },
  swipeItemBlank: {
    height: 30,
  },
  swipeBlank: {
    height: 30,
    backgroundColor: "transparent",
  },
  card: {
    width: 160,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3, // Android shadow
  },
  image: {
    width: "100%",
    height: 100,
  },
  title2: {
    padding: 8,
    fontSize: 14,
    fontWeight: "bold",
  }
});
