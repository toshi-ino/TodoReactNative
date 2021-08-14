import React, { useState, useEffect } from "react";
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
import { navigation } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
  containerInputScreen: {
    marginTop: 30,
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

// const showDatePicker = () => {
//   return <DateTimePickerModal isVisible={true} mode="date" />;
// };

export default function EditTodo({ route }) {
  //   const { editTodo, setTodo, onPressUpdate, indexForEditTodo } = props;
  const {
    editTodoBase,
    setTodo,
    incompleteTodos,
    setIncompleteTodos,
    indexForEditTodo,
    navigation,
  } = route.params;
  //   console.log(editTodo);
  //   console.log(indexForEditTodo);

  const [editTodo, setEditTodo] = useState({
    title: "",
    dueday: "",
    commemt: "",
    checked: false,
  });

  useEffect(() => {
    setEditTodo(editTodoBase);
  }, []);

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

    setEditTodo((prevState) => {
      return {
        ...prevState,
        dueday: selectedDate,
      };
    });

    hideDatePicker();
  };

  const isInputedTitle = editTodo.title === "" ? true : false;

  const styleButtonOK = !isInputedTitle
    ? styles.customBtnText
    : styles.customBtnTextDisable;

  const onPressUpdate = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    newIncompleteTodos.splice(index, 0, editTodo);

    setIncompleteTodos(newIncompleteTodos);
    setEditTodo({});

    Alert.alert("", "Todoの内容を変更しました");

    navigation.navigate("Home");

    // //編集後に詳細画面の情報が残っていたためクリアする
    // setDetailTodo({});
  };

  return (
    <SafeAreaView style={styles.containerInputScreen}>
      <View style={styles.containerInputBar}>
        <View style={styles.containerTitle}>
          <Text>タイトル</Text>
          <TextInput
            style={styles.inputBar}
            placeholder="タイトルを入力"
            value={editTodo.title}
            onChangeText={(text) =>
              setEditTodo((prevState) => {
                return {
                  ...prevState,
                  title: text,
                };
              })
            }
            height={35}
            maxLength={15}
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
                value={editTodo.dueday}
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
              value={editTodo.commemt}
              onChangeText={(text) =>
                setEditTodo((prevState) => {
                  return {
                    ...prevState,
                    commemt: text,
                  };
                })
              }
              height={4 * 18}
              maxLength={150}
            />
          </View>
        </View>
      </View>

      <View style={styles.containerButton}>
        <Pressable
          style={styles.button}
          onPress={() => onPressUpdate(indexForEditTodo)}
          disabled={isInputedTitle}
        >
          <Text style={styleButtonOK}>追加</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.customBtnText}>キャンセル</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
