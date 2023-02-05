import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";
import { Fontisto } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";
const WORKTAB_ON_KEY = "@WorkTab";

export default function App() {
  const [working, setWorking] = useState(true);
  const [toDos, setToDos] = useState({});
  const [text, setText] = useState("");
  const travel = () => {
    setWorking(false);
    AsyncStorage.setItem(WORKTAB_ON_KEY, "false");
  };
  const work = () => {
    setWorking(true);
    AsyncStorage.setItem(WORKTAB_ON_KEY, "true");
  };
  const onChangeText = (payload) => setText(payload);
  const deleteTodo = async (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "I am sure",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if (s) setToDos(JSON.parse(s));
  };
  const loadTabinfo = async () => {
    const s = await AsyncStorage.getItem(WORKTAB_ON_KEY);
    if (JSON.parse(s) == true) {
      work();
    } else travel();
  };
  useEffect(() => {
    loadToDos();
    loadTabinfo();
    console.log(toDos);
  }, []);
  const addToDo = async () => {
    if (text === "") return;
    //save to do
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, checkBoxName: "checkbox-passive" },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const checkDoneTodo = async (key) => {
    var newCheckBoxName = "";
    if (toDos[key].checkBoxName == "checkbox-passive")
      newCheckBoxName = "checkbox-active";
    else newCheckBoxName = "checkbox-passive";
    const newToDos = { ...toDos };
    newToDos[key].checkBoxName = newCheckBoxName;
    setToDos(newToDos);
    saveToDos(newToDos);
  };
  const toDoLongPress = (key, prevMsg) => {
    Alert.prompt(
      "Rename your todo",
      "",
      (msg) => {
        const newToDos = { ...toDos };
        newToDos[key].text = msg;
        setToDos(newToDos);
        saveToDos(newToDos);
      },
      "plain-text",
      prevMsg,
      "plain-text"
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onChangeText={onChangeText}
          onSubmitEditing={addToDo}
          returnKeyType="done"
          value={text}
          placeholder={working ? "Add a To Do" : "Where do you Wanna go?"}
          style={styles.input}
        />
      </View>
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => checkDoneTodo(key)}
              >
                <Fontisto
                  name={toDos[key].checkBoxName}
                  size={18}
                  color="white"
                ></Fontisto>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 5 }}
                onLongPress={() => toDoLongPress(key, toDos[key].text)}
              >
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(key)}>
                <Fontisto name="trash" size={18} color={theme.grey} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
