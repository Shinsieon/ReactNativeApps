import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import { theme } from "./colors";
export default function App() {
  const [curLocation, setCurLocation] = useState({});
  const [ok, setOk] = useState(false);
  const refreshLocation = () => {
    getCurLocation();
  };
  const onRegionChange = () => {
    getCurLocation();
  };
  const getCurLocation = async () => {
    console.log("지도 탐색");
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 1 });
    // const location = await Location.reverseGeocodeAsync(
    //   { latitude, longitude },
    //   { useGoogleMaps: false }
    // );
    setCurLocation({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    console.log(curLocation);
  };
  useEffect(() => {
    getCurLocation();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height * 0.4,
          position: "absolute",
          top: 0,
          zIndex: 1,
        }}
        region={curLocation}
      ></MapView>
      <View style={styles.infoView}>
        <TouchableOpacity style={styles.circle} onPress={refreshLocation}>
          <Ionicons name="refresh-circle" size={60} color="black" />
        </TouchableOpacity>
        <View style={styles.infoRow}>
          <Ionicons name="subway" size={50} color="black" />
          <TextInput
            placeholder="도착역을 입력해주세요 "
            placeholderTextColor={"white"}
            style={styles.infoInput}
          ></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  infoView: {
    position: "absolute",
    zIndex: 2,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.7,
    bottom: 0,
    borderRadius: 40,
    backgroundColor: "white",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  infoTitle: {
    fontSize: 30,
    color: "black",
  },
  infoRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  infoInput: {
    backgroundColor: theme.grey,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: 250,
    height: 50,
    fontSize: 18,
    color: "white",
  },
  circle: {
    position: "absolute",
    alignSelf: "center",
    marginTop: -30,
  },
});
