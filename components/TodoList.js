import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { CheckBox } from "react-native-elements";
import { ProgressBar } from "react-native-paper";
import { updateTodo } from "../src/graphql/mutations";
import Icon from "react-native-vector-icons/FontAwesome";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textTop: {
    marginTop: 50,
    fontSize: 35,
    color: "#00BFFF",
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  customBtnText: {
    fontSize: 15,
    color: "white",
    marginStart: 10,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 20,
    height: 30,
    width: 140,
    backgroundColor: "#00BFFF",
    marginStart: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonTransparent: {
    borderRadius: 20,
    height: 30,
    width: 140,
    backgroundColor: "transparent",
    marginStart: 10,
  },
  textStyle: {
    fontSize: 18,
    color: "black",
    marginEnd: 10,
  },
  styleProgressBar: {
    height: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#A7F1FF",
  },
  centerContainerNullTodo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyleNullTodo: {
    fontSize: 16,
    color: "gray",
  },
  listContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  boxOutline: {
    height: 60,
    width: "90%",
    borderColor: "#DDDDDD",
    borderWidth: 1,
    backgroundColor: "white",
    flexDirection: "row",
  },
  leftContainer: {
    width: 50,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  centerContainer: {
    width: 220,
    flexDirection: "column",
    marginStart: 10,
    justifyContent: "center",
    padding: 3,
  },
  centerUpperContainer: {
    height: "60%",
    justifyContent: "center",
  },
  centerLowerContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  styleDueday: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  textStyleDueday: {
    fontSize: 14,
    color: "#BBBBBB",
    marginStart: 5,
  },
  ligthContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const TodoList = (props) => {
  const { todos, isOverTodoNUmber } = props;
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  async function onPressCheckBox(index) {
    todos[index].checked = !todos[index].checked;
    setChecked(!checked);

    await API.graphql(
      graphqlOperation(updateTodo, {
        input: {
          id: todos[index].id,
          checked: todos[index].checked,
        },
      })
    );
  }

  const checkedCount = () => {
    let count = 0;
    let ratio = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].checked === true) {
        count++;
      } else {
      }
    }

    if (todos.length === 0) {
      ratio = 0;
    } else if (todos.length > 0) {
      ratio = count / todos.length;
    } else {
      ratio = 0;
    }

    return ratio.toFixed(2);
  };

  const onPressDetail = (id) => {
    navigation.navigate("Detail", {
      idDetail: id,
    });
  };

  const isNullTodos = todos.length === 0 ? true : false;

  return (
    <View>
      <View style={styles.topContainer}>
        <Text style={styles.textTop}>TODO</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* 位置調整を簡単にするために透明のボタンを配置する */}
        <Pressable style={styles.buttonTransparent}>
          <Text></Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Input");
          }}
          disabled={isOverTodoNUmber}
        >
          <Icon name="plus-circle" size={18} color="white" />
          <Text style={styles.customBtnText}>Todoを作成</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        {isNullTodos && (
          <View>
            <ProgressBar
              progress={checkedCount()}
              color={"#00BFFF"}
              style={styles.styleProgressBar}
            />
            <View style={styles.boxOutline}>
              <View style={styles.centerContainerNullTodo}>
                <Text style={styles.textStyleNullTodo}>Todoがありません</Text>
              </View>
            </View>
          </View>
        )}

        {todos.map((todo, index) => {
          const isOneTodo = index === 0 ? true : false;

          return (
            <View key={index}>
              {isOneTodo && (
                <ProgressBar
                  progress={checkedCount()}
                  color={"#00BFFF"}
                  style={styles.styleProgressBar}
                />
              )}
              <View style={styles.boxOutline}>
                <View style={styles.leftContainer}>
                  <CheckBox
                    checked={todo.checked}
                    onPress={() => onPressCheckBox(index)}
                  />
                </View>

                <View style={styles.centerContainer}>
                  <View style={styles.centerUpperContainer}>
                    <Text style={styles.textStyle}>{todo.title}</Text>
                  </View>
                  <View style={styles.centerLowerContainer}>
                    <View style={styles.styleDueday}>
                      <Icon name="clock-o" size={14} color={"#BBBBBB"} />
                      <Text style={styles.textStyleDueday}>{todo.dueday}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.ligthContainer}>
                  <Pressable onPress={() => onPressDetail(todo.id)}>
                    <Icon name="chevron-right" size={20} color={"#00BFFF"} />
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
