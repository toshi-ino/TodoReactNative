import React, { useState } from "react";
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
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../src/graphql/mutations";

const styles = StyleSheet.create({
  containerInputScreen: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  containerInputBar: {
    width: "90%",
  },
  containeTitle: {
    marginTop: 80,
    width: "100%",
  },
  styleInputBar: {
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
  styleCommemtBox: {
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
  containerButton: {
    flex: 1,
    width: "90%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 30,
    marginEnd: 20,
    flexDirection: "row",
  },
  styleTextBtn: {
    fontSize: 16,
    color: "#00BFFF",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  styleButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginLeft: 20,
    height: 20,
    width: 80,
  },
  styleTextBtnDisable: {
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

export default function InputTodo({ navigation }) {
  const [todo, setTodo] = useState({
    title: "",
    dueday: "",
    commemt: "",
    checked: false,
  });
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);

  const isIOS = Platform.OS === "ios" ? true : false;
  const inputAccessoryViewID = isIOS === true ? "endKeyboard" : null;

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

  const isInputedTitle = todo.title !== "" ? true : false;

  const styleButtonOK = isInputedTitle
    ? styles.styleTextBtn
    : styles.styleTextBtnDisable;

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
    <SafeAreaView style={styles.containerInputScreen}>
      <View style={styles.containerInputBar}>
        <View style={styles.containeTitle}>
          <Text style={styles.textInputBar}>タイトル</Text>
          <TextInput
            style={styles.styleInputBar}
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

        <View style={styles.containerDueday}>
          <Text style={styles.textInputBar}>期限</Text>
          <DateTimePickerModal
            isVisible={datePickerVisibility}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View>
            <TextInput
              style={styles.styleInputBar}
              placeholder="期限を入力してください"
              value={todo.dueday}
              height={35}
              onFocus={() => showDatePicker()}
              maxLength={15}
            />
          </View>
        </View>

        <View style={styles.containerCommemt}>
          <Text style={styles.textInputBar}>コメント</Text>
          <View style={styles.styleCommemtBox}>
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
              inputAccessoryViewID={inputAccessoryViewID}
              // showSoftInputOnFocus={false}
            />
          </View>
        </View>
      </View>

      <View style={styles.containerButton}>
        <Pressable
          style={styles.styleButton}
          onPress={onPressAdd}
          disabled={!isInputedTitle}
        >
          <Text style={styleButtonOK}>OK</Text>
        </Pressable>
        <Pressable
          style={styles.styleButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.styleTextBtn}>キャンセル</Text>
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
