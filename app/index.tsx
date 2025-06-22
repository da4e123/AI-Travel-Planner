import { useEffect } from "react";
import { View } from "react-native";
import Login from "./../components/Login";
import { auth } from "./../configs/FirebaseConfig";


export default function Index() {
  console.log("Current user on app start:",auth.currentUser);
  useEffect(() => {
    console.log("Current user on app start:", auth.currentUser);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Login />
    </View>
  );
}
