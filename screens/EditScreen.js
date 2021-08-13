import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const styles = StyleSheet.create({
  inputItemsStyle: {
    flex: 1,
    width: "100%",
    paddingBottom: 4,
  },
  inputElement: {
    flex: 1,
    alignItems: "center",
  },
  inputBar: {
    width: 150,
    height: 1,
    borderRadius: 16,
    paddingStart: 10,
    backgroundColor: "white",
  },
  customBtnText: {
    fontSize: 16,
    color: "black",
  },
  buttonAble: {
    alignItems: "center",
    padding: 2,
    borderRadius: 4,
    height: 20,
    width: 100,
    backgroundColor: "grey",
    marginLeft: 10,
  },
  buttonDisable: {
    alignItems: "center",
    padding: 2,
    borderRadius: 4,
    height: 20,
    width: 100,
    backgroundColor: "black",
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  commemtBox: {
    backgroundColor: "white",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    maxHeight: 3 * 20,
    minHeight: 3 * 20,
    width: 200,
    paddingStart: 1,
    paddingEnd: 1,
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

  const styleButton = !isInputedTitle
    ? styles.buttonAble
    : styles.buttonDisable;

  const onPressUpdate = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    newIncompleteTodos.splice(index, 0, editTodo);

    setIncompleteTodos(newIncompleteTodos);
    setEditTodo({});

    navigation.navigate("Home");

    // //編集後に詳細画面の情報が残っていたためクリアする
    // setDetailTodo({});
  };

  return (
    <View style={styles.inputElement}>
      <View style={styles.inputItemsStyle}>
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
          height={20}
        />

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
              placeholder="期限を入力"
              value={editTodo.dueday}
              height={20}
            />
          </View>
        </Pressable>

        <Text>コメント</Text>
        <View style={styles.commemtBox}>
          <TextInput
            multiline={true}
            numberOfLines={3}
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
            height={3 * 20}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styleButton}
          onPress={() => onPressUpdate(indexForEditTodo)}
          disabled={isInputedTitle}
        >
          <Text style={styles.customBtnText}>追加</Text>
        </Pressable>
      </View>
    </View>
  );
}
