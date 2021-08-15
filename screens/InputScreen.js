import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../src/graphql/mutations";

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
    maxHeight: 4 * 23,
    minHeight: 4 * 23,
    paddingTop: 10,
    paddingBottom: 10,
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
  const { navigation } = route.params;
  const [todo, setTodo] = useState({
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
    const selectedDate =
      date.getFullYear() +
      "年" +
      date.getMonth() +
      "月" +
      date.getDate() +
      "日";

    setTodo((prevState) => {
      return {
        ...prevState,
        dueday: selectedDate,
      };
    });

    hideDatePicker();
  };

  const isInputedTitle = todo.title !== "" ? true : false;

  const styleButtonOK = isInputedTitle
    ? styles.customBtnText
    : styles.customBtnTextDisable;

  async function onPressAdd() {
    try {
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }

    Alert.alert("", "新しいTodoを追加しました");
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.inputScreenContainer}>
      <View style={styles.inputBarContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textInputBar}>タイトル</Text>
          <TextInput
            style={styles.inputBar}
            placeholder="タイトルを入力してください"
            value={todo.title}
            onChangeText={(text) =>
              setTodo((prevState) => {
                return {
                  ...prevState,
                  title: text,
                };
              })
            }
            height={35}
            maxLength={12}
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
              placeholder="期限を入力してください"
              value={todo.dueday}
              height={35}
              onFocus={() => showDatePicker()}
              maxLength={15}
            />
          </View>
        </View>

        <View style={styles.commemtContainer}>
          <Text style={styles.textInputBar}>コメント</Text>
          <View style={styles.commemtBox}>
            <TextInput
              style={{
                textAlignVertical: "top",
              }}
              multiline={true}
              numberOfLines={4}
              placeholder="コメントを入力してください"
              value={todo.commemt}
              onChangeText={(text) =>
                setTodo((prevState) => {
                  return {
                    ...prevState,
                    commemt: text,
                  };
                })
              }
              height={4 * 17}
              maxLength={150}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={onPressAdd}
          disabled={!isInputedTitle}
        >
          <Text style={styleButtonOK}>OK</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.customBtnText}>キャンセル</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
