import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  Alert,
  Keyboard,
  InputAccessoryView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { updateTodo } from "../src/graphql/mutations";
import { useIsFocused } from "@react-navigation/native";
import { getTodo } from "../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const styles = StyleSheet.create({
  containerInputScreen: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  containerInputBar: {
    width: "90%",
  },
  containerTitle: {
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
  containerDueday: {
    marginTop: 10,
  },
  containerCommemt: {
    marginTop: 10,
  },
  commemtBox: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    maxHeight: 4 * 24,
    minHeight: 4 * 24,
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 10,
    paddingEnd: 10,
    borderRadius: 5,
  },
  containerButton: {
    flex: 1,
    width: "90%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 30,
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
  buttonEndKeybord: {
    width: 60,
    alignItems: "center",
    padding: 10,
  },
  textButtonEndKeybord: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00BFFF",
  },
});

export default function EditTodo({ navigation, route }) {
  const { idEdit } = route.params;
  const [todo, setTodo] = useState({});
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);

  const isIOS = Platform.OS === "ios" ? true : false;
  const inputAccessoryViewID = isIOS === true ? "endKeyboard" : null;

  async function getTodoDetail() {
    try {
      const todoData = await API.graphql(
        graphqlOperation(getTodo, { id: idEdit })
      );
      const todoBeforeSet = todoData.data.getTodo;
      setTodo(todoBeforeSet);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    getTodoDetail();
  }, [isFocused]);

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
      (date.getMonth() + 1) +
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

  const isInputedTitle = todo.title === "" ? true : false;

  const styleButtonOK = !isInputedTitle
    ? styles.customBtnText
    : styles.customBtnTextDisable;

  async function onPressUpdate(id) {
    await API.graphql(
      graphqlOperation(updateTodo, {
        input: {
          id: todo.id,
          title: todo.title,
          dueday: todo.dueday,
          commemt: todo.commemt,
        },
      })
    );
    Alert.alert("", "Todoの内容を変更しました");
    navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={styles.containerInputScreen}>
      <View style={styles.containerInputBar}>
        <View style={styles.containerTitle}>
          <Text>タイトル</Text>
          <TextInput
            style={styles.inputBar}
            placeholder="タイトルを入力"
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

        <View style={styles.containerDueday}>
          <Text>期限</Text>
          <DateTimePickerModal
            isVisible={datePickerVisibility}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Pressable onPressIn={() => showDatePicker()}>
            <View>
              <TextInput
                style={styles.inputBar}
                editable={true}
                placeholder="期限を入力してください"
                value={todo.dueday}
                height={35}
                onFocus={() => showDatePicker()}
                maxLength={15}
              />
            </View>
          </Pressable>
        </View>

        <View style={styles.containerCommemt}>
          <Text>コメント</Text>
          <View style={styles.commemtBox}>
            <TextInput
              style={{ textAlignVertical: "top" }}
              multiline={true}
              numberOfLines={4}
              placeholder="コメントを入力"
              value={todo.commemt}
              onChangeText={(text) =>
                setTodo((prevState) => {
                  return {
                    ...prevState,
                    commemt: text,
                  };
                })
              }
              height={4 * 18}
              maxLength={150}
              inputAccessoryViewID={inputAccessoryViewID}
              // showSoftInputOnFocus={false}
            />
          </View>
        </View>
      </View>

      <View style={styles.containerButton}>
        <Pressable
          style={styles.button}
          onPress={() => onPressUpdate(idEdit)}
          disabled={isInputedTitle}
        >
          <Text style={styleButtonOK}>追加</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.customBtnText}>キャンセル</Text>
        </Pressable>
      </View>

      {isIOS && (
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor="hsl(0, 0%, 95%)"
        >
          <View style={{ alignItems: "flex-end" }}>
            <Pressable
              style={styles.buttonEndKeybord}
              onPress={() => Keyboard.dismiss()}
            >
              <Text style={styles.textButtonEndKeybord}>完了</Text>
            </Pressable>
          </View>
        </InputAccessoryView>
      )}
    </SafeAreaView>
  );
}
