import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { CheckBox } from "react-native-elements";

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    color: "black",
    marginEnd: 10,
  },
  textStyleDueday: {
    fontSize: 14,
    color: "gray",
  },
  customBtnText: {
    fontSize: 16,
    color: "white",
  },
  button: {
    alignItems: "center",
    padding: 2,
    borderRadius: 4,
    height: 20,
    width: 50,
    backgroundColor: "grey",
    marginStart: 10,
  },
  centerContainer: {
    width: 200,
    flexDirection: "column",
    marginStart: 10,
    // alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  boxOutline: {
    height: 60,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: 50,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ligthContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const DetailTodos = (props) => {
  const { todos, onPressEdit, indexForDetailTodo, onPressDelete } = props;

  return (
    <View>
      <Text>TODO</Text>

      <View style={styles.boxOutline}>
        <View style={styles.leftContainer}>
          <CheckBox
            checked={todos.checked}
            onIconPress={() => onPressCheckBox(index)}
          />
        </View>

        <View style={styles.centerContainer}>
          <Text style={styles.textStyle}>title: {todos.title}</Text>
          <Text style={styles.textStyleDueday}>dueday: {todos.dueday}</Text>
        </View>

        <View style={styles.ligthContainer}></View>
      </View>

      <View style={styles.boxOutline}>
        <Text style={styles.textStyle}>コメント: {todos.commemt}</Text>
      </View>

      <View style="listItem">
        {/* <button onClick={() => onClickComplete(index)}>完了</button>  */}
        <Pressable
          style={styles.button}
          onPress={() => onPressEdit(indexForDetailTodo)}
        >
          <Text style={styles.customBtnText}>編集</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => onPressDelete(indexForDetailTodo)}
        >
          <Text style={styles.customBtnText}>削除</Text>
        </Pressable>
      </View>
    </View>
  );
};
