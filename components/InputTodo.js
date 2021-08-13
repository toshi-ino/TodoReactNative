import React, { useState } from "react";
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

const showDatePicker = () => {
  return <DateTimePickerModal isVisible={true} mode="date" />;
};

export const InputTodo = (props) => {
  const { todoText, setTodo, onPress, disabled } = props;
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

    setTodo((prevState) => {
      return {
        ...prevState,
        dueday: selectedDate,
      };
    });

    hideDatePicker();
  };

  const isInputedTitle = todoText.title === "" ? true : false;

  const styleButton = !isInputedTitle
    ? styles.buttonAble
    : styles.buttonDisable;

  return (
    <View style={styles.inputElement}>
      <View style={styles.inputItemsStyle}>
        <Text>タイトル</Text>
        <TextInput
          style={styles.inputBar}
          editable={disabled}
          placeholder="タイトルを入力"
          value={todoText.title}
          onChangeText={(text) =>
            setTodo((prevState) => {
              return {
                ...prevState,
                title: text,
              };
            })
          }
          height={20}
        />

        <Text>期限</Text>
        {/* <DateTimePickerModal isVisible={true} mode="date" /> */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => showDatePicker()}
        >
          <Text style={styles.customBtnText}>OK</Text>
        </TouchableOpacity> */}

        {/* <Pressable onPressIn={() => showDatePicker()}>
          <Text style={styles.customBtnText}>カレンダー</Text>
        </Pressable> */}

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
              value={todoText.dueday}
              height={20}
            />
          </View>
        </Pressable>

        <Text>コメント</Text>
        <View style={styles.commemtBox}>
          <TextInput
            multiline={true}
            numberOfLines={3}
            // style={styles.inputBar}
            editable={disabled}
            placeholder="コメントを入力"
            value={todoText.commemt}
            onChangeText={(text) =>
              setTodo((prevState) => {
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

      {/* <button disabled={disabled} onClick={onClick}> */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={styleButton}
          onPress={onPress}
          disabled={isInputedTitle}
        >
          <Text style={styles.customBtnText}>OK</Text>
        </Pressable>
        <Pressable style={styles.buttonAble} onPress={onPress}>
          <Text style={styles.customBtnText}>キャンセル</Text>
        </Pressable>
      </View>
    </View>
  );
};
