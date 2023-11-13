import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "./src/screens/Search/Search";  // Cambié el nombre para la pantalla de búsqueda
import Register from "./src/screens/Register/Register";
import Login from "./src/screens/Login/Login";
import Home from "./src/screens/Home/Home";
import Menu from "./src/componentes/Menu";
import ProfileUsers from "./src/screens/ProfileUsers/ProfileUsers";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"  // Cambié el nombre de la pantalla
          component={Search}  // Cambié el componente asociado
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileUsers"
          component={ProfileUsers}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});