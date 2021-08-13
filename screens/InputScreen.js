import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const styles = StyleSheet.create({
  inputScreenContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  inputBarContainer: {
    width: "90%",
  },
  titleContainer: {
    marginTop: 80,
    width: "100%",
  },
  inputBar: {
    width: "100%",
    height: 1,
    paddingStart: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "white",
    borderRadius: 5,
  },
  duedayContainer: {
    marginTop: 10,
  },
  commemtContainer: {
    marginTop: 10,
  },
  commemtBox: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    maxHeight: 4 * 20,
    minHeight: 4 * 20,
    paddingStart: 10,
    paddingEnd: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    width: "90%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 50,
    marginEnd: 20,
    flexDirection: "row",
  },
  customBtnText: {
    fontSize: 16,
    color: "#00BFFF",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginLeft: 20,
    height: 20,
    width: 80,
  },
  customBtnTextDisable: {
    fontSize: 16,
    color: "gray",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});

export default function InputTodo({ route }) {
  // const { todoText, setTodo, onPress, disabled } = route.params;
  const { disabled, incompleteTodos, setIncompleteTodos, navigation } =
    route.params;
  const [todoText, setTodoText] = useState({
    title: "",
    dueday: "",
    commemt: "",
    checked: false,
  });

  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.log("A date has been picked:" + date);
    const selectedDate =
      date.getFullYear() +
      "年" +
      date.getMonth() +
      "月" +
      date.getDate() +
      "日";

    setTodoText((prevState) => {
      return {
        ...prevState,
        dueday: selectedDate,
      };
    });

    hideDatePicker();
  };

  const isInputedTitle = todoText.title === "" ? true : false;

  const styleButtonOK = !isInputedTitle
    ? styles.customBtnText
    : styles.customBtnTextDisable;

  const onPressAdd = () => {
    // if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText({
      title: "",
      dueday: "",
      commemt: "",
      checked: false,
    });

    Alert.alert("", "新しいTodoを追加しました");

    navigation.navigate("Home");
  };

  // console.log(todoText);

  return (
    <SafeAreaView style={styles.inputScreenContainer}>
      <View style={styles.inputBarContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textInputBar}>タイトル</Text>
          <TextInput
            style={styles.inputBar}
            editable={disabled}
            placeholder="タイトルを入力してください"
            value={todoText.title}
            onChangeText={(text) =>
              setTodoText((prevState) => {
                return {
                  ...prevState,
                  title: text,
                };
              })
            }
            height={30}
          />
        </View>

        <View style={styles.duedayContainer}>
          <Text style={styles.textInputBar}>期限</Text>
          <DateTimePickerModal
            isVisible={datePickerVisibility}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View>
            <TextInput
              style={styles.inputBar}
              editable={true}
              placeholder="期限を入力してください"
              value={todoText.dueday}
              height={30}
              onFocus={() => showDatePicker()}
            />
          </View>
        </View>

        <View style={styles.commemtContainer}>
          <Text style={styles.textInputBar}>コメント</Text>
          <View style={styles.commemtBox}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              editable={disabled}
              placeholder="コメントを入力してください"
              value={todoText.commemt}
              onChangeText={(text) =>
                setTodoText((prevState) => {
                  return {
                    ...prevState,
                    commemt: text,
                  };
                })
              }
              height={4 * 20}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={onPressAdd}
          disabled={isInputedTitle}
        >
          <Text style={styleButtonOK}>OK</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.customBtnText}>キャンセル</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
