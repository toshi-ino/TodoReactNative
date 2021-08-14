import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { IncompleteTodos } from "../components/IncompleteTodos";

const styles = StyleSheet.create({
  // inputArea: {
  //   backgroundColor: "#c1ffff",
  //   width: "100%",
  //   height: 180,
  //   borderRadius: 8,
  //   padding: 8,
  // },
  container: {
    marginTop: 30,
    alignItems: "center",
  },
  imcompleteArea: {
    width: "100%",
  },
  // completeArea: {
  //   backgroundColor: "#ffffe0",
  //   width: "100%",
  //   minHeight: 60,
  //   padding: 8,
  //   margin: 8,
  //   borderRadius: 8,
  // },
});

export default function HomeScreen(props) {
  const { navigation } = props;
  // const [todoText, setTodoText] = useState("");
  const [todoText, setTodoText] = useState({
    title: "",
    dueday: "",
    commemt: "",
    checked: false,
  });
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [detailTodo, setDetailTodo] = useState({
    title: "",
    dueday: "",
    commemt: "",
    checked: false,
  });
  const [indexForDetailTodo, setIndexForDetailTodo] = useState(0);
  const [editTodo, setEditTodo] = useState({
    title: "",
    dueday: "",
    commemt: "",
    checked: false,
  });
  const [indexForEditTodo, setIndexForEditTodo] = useState(0);

  // const onChageTodoText = (event) => setTodoText(event.target.value);

  // const onPressAdd = () => {
  //   // if (todoText === "") return;
  //   const newTodos = [...incompleteTodos, todoText];
  //   setIncompleteTodos(newTodos);
  //   setTodoText({
  //     title: "",
  //     dueday: "",
  //     commemt: "",
  //     checked: false,
  //   });
  // };

  // const onPressDelete = (index) => {
  //   const newTodos = [...incompleteTodos];
  //   newTodos.splice(index, 1);
  //   setIncompleteTodos(newTodos);
  //   //削除しても詳細画面の情報が残っていたためクリアする
  //   setDetailTodo({});
  // };

  const onPressComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const navigationDetail = (todo, index) => {
    navigation.navigate("Detail", {
      todos: todo,
      indexForDetailTodo: index,
      incompleteTodos: incompleteTodos,
      setIncompleteTodos: setIncompleteTodos,
      setDetailTodo: setDetailTodo,
      navigation: navigation,
    });
  };

  const onPressBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  const onPressEdit = (index) => {
    setEditTodo(detailTodo);
    setIndexForEditTodo(index);
  };

  const onPressUpdate = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    newIncompleteTodos.splice(index, 0, editTodo);

    setIncompleteTodos(newIncompleteTodos);
    setEditTodo({});

    //編集後に詳細画面の情報が残っていたためクリアする
    setDetailTodo({});
  };

  const isOverIncompleteNumber = incompleteTodos.length < 5 ? true : false;

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.inputArea}>
        <InputTodo
          todoText={todoText}
          // onChange={onChageTodoText}
          setTodo={setTodoText}
          onPress={onPressAdd}
          disabled={incompleteTodos.length < 5}
        />
      </View> */}

      {incompleteTodos.length >= 5 && (
        <Text style={{ color: "red" }}>登録できるtodoは5個まで</Text>
      )}
      <View style={styles.imcompleteArea}>
        <IncompleteTodos
          todos={incompleteTodos}
          onPressComplete={onPressComplete}
          navigationDetail={navigationDetail}
          detailTodo={detailTodo}
          indexForDetailTodo={indexForDetailTodo}
          setDetailTodo={setDetailTodo}
          setIndexForDetailTodo={setIndexForDetailTodo}
          onPressInput={() =>
            navigation.navigate("Input", {
              disabled: isOverIncompleteNumber,
              incompleteTodos: incompleteTodos,
              setIncompleteTodos: setIncompleteTodos,
              navigation: navigation,
            })
          }
          setEditTodo={setEditTodo}
        />
      </View>

      {/* <View style={styles.completeArea}>
        <DetailTodos
          todos={detailTodo}
          onPressEdit={onPressEdit}
          indexForDetailTodo={indexForDetailTodo}
        />
      </View> */}

      {/* <View style={styles.inputArea}>
        <EditTodo
          editTodo={editTodo}
          indexForEditTodo={indexForEditTodo}
          // onChange={onChageTodoText}
          setTodo={setEditTodo}
          onPressUpdate={onPressUpdate}
        />
      </View> */}
    </SafeAreaView>
  );
}
