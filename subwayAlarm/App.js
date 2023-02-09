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
  ScrollView,
  Image,
} from "react-native";
import MapView from "react-native-maps";
import { theme } from "./colors";
import stationData from "./StationJSON.json";
import { useFonts } from "expo-font";
export default function App() {
  const iconMap = {
    "01호선": "./assets/line1Icon.svg",
    "02호선": "./assets/line2Icon.png",
    "03호선": "./assets/line3Icon.webp",
    "04호선": "./assets/line4Icon.svg",
    "05호선": "./assets/line5Icon.svg",
    "06호선": "./assets/line6Icon.png",
    "07호선": "./assets/line7Icon.png",
    "08호선": "./assets/line8Icon.png",
  };
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/MerriweatherSans-Medium.ttf"),
  });
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
        <ScrollView style={styles.stationView}>
          {stationData.map((item, idx) => {
            if (!iconMap[item.line]) return;
            return (
              <View style={styles.stationItem} key={idx}>
                <Image
                  source={require(iconMap[item.line])}
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.stationText}>{item.line}</Text>
              </View>
            );
          })}
        </ScrollView>
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
    fontFamily: "Inter_900Black",
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
    backgroundColor: theme.bg,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: 250,
    height: 50,
    fontSize: 18,
    color: "white",
    fontFamily: "Inter-Black",
  },
  circle: {
    position: "absolute",
    alignSelf: "center",
    marginTop: -30,
  },
  stationView: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  stationItem: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    height: 30,
    borderRadius: 10,
  },
  stationText: {
    fontSize: 20,
  },
});
