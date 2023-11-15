import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileUsers from "../screens/ProfileUsers/profileUsers.js"; 

const Stack = createNativeStackNavigator();

export default function StackProfileUsers() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileUsers"
          component={ProfileUsers}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

/* FOTOS */