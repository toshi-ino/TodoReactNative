import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { IncompleteTodos } from "../components/IncompleteTodos";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../src/graphql/queries";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
  },
  imcompleteArea: {
    width: "100%",
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
      {todos.length >= 5 && (
        <Text style={{ color: "red" }}>登録できるtodoは5個まで</Text>
      )}
      <View style={styles.imcompleteArea}>
        <IncompleteTodos
          todos={todos}
          navigation={navigation}
          isOverTodoNUmber={isOverTodoNumber}
        />
      </View>
    </SafeAreaView>
  );
}
