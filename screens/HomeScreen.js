import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TodoList } from "../components/TodoList";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listTodos } from "../src/graphql/queries";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
  },
  containerTodoList: {
    width: "100%",
  },
  containerButttonSignout: {
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 10,
    marginEnd: 20,
  },
  buttonSingOut: {
    height: 25,
    width: 100,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flexDirection: "row",
  },
  textButtonSignout: {
    marginStart: 8,
  },
});

export default function HomeScreen(props) {
  const { navigation } = props;
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchTodos();
  }, [isFocused]);

  const isOverTodoNumber = todos.length >= 5 ? true : false;

  return (
    <SafeAreaView style={styles.container}>
      {/* {todos.length >= 5 && (
        <Text style={{ color: "red" }}>登録できるtodoは5個まで</Text>
      )} */}

      <View style={styles.containerButttonSignout}>
        <Pressable
          style={styles.buttonSingOut}
          onPress={() => {
            Auth.signOut();
          }}
        >
          <Icon name="sign-out" size={18} color="gray" />
          <Text style={styles.textButtonSignout}>Signout</Text>
        </Pressable>
      </View>

      <View style={styles.containerTodoList}>
        <TodoList todos={todos} isOverTodoNUmber={isOverTodoNumber} />
      </View>
    </SafeAreaView>
  );
}
