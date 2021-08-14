import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { CheckBox, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  detailScreenContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTopButton: {
    marginTop: 5,
    width: "100%",
    justifyContent: "flex-start",
  },
  styleButtonTop: {
    borderRadius: 20,
    height: 30,
    width: 140,
    backgroundColor: "transparent",
    marginStart: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textButtonTop: {
    marginStart: 15,
    fontSize: 16,
    color: "#00BFFF",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  containerTilte: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 35,
    color: "#00BFFF",
  },
  containerButton: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textButtonMain: {
    fontSize: 15,
    color: "white",
    marginStart: 10,
    fontWeight: "bold",
  },
  styleButtonMain: {
    borderRadius: 20,
    height: 30,
    width: 140,
    backgroundColor: "#00BFFF",
    marginStart: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  styleButtonDelete: {
    borderRadius: 20,
    height: 30,
    width: 140,
    backgroundColor: "#FA5858",
    marginStart: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  styleTodoBoxOutline: {
    marginTop: 20,
    height: 155,
    width: "90%",
    borderColor: "#DDDDDD",
    borderWidth: 1,
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 5,
    alignItems: "center",
  },
  containerUpper: {
    width: "100%",
    height: "45%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLeft: {
    width: 50,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  containerCenter: {
    width: 220,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  ajustCenterItem: {
    marginStart: 10,
  },
  containerCentarUpper: {
    height: "60%",
    justifyContent: "center",
  },
  containerCenterLower: {
    flex: 1,
    justifyContent: "flex-start",
  },
  styletextStyleDueday: {
    fontSize: 14,
    color: "#BBBBBB",
  },
  containerLigth: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: "95%",
  },
  containerLower: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
  },
  ajustLowerItem: {
    marginTop: 5,
    marginBottom: 5,
    marginStart: 10,
    marginEnd: 10,
  },
  textStyle: {
    fontSize: 16,
    color: "black",
    marginEnd: 10,
  },
});

export default function DetailTodo({ route }) {
  // export const DetailTodos = (props) => {
  //   const { todos, onPressEdit, indexForDetailTodo, onPressDelete } = route;
  const {
    todos,
    indexForDetailTodo,
    incompleteTodos,
    setIncompleteTodos,
    setDetailTodo,
    navigation,
    setEditTodo,
  } = route.params;

  const onPressDelete = (index) => {
    Alert.alert(
      "",
      "Todoを削除しますか？",
      [
        { text: "Ok", onPress: () => onPressOKAlert(index) },
        { text: "キャンセル" },
      ],
      { cancelable: false }
    );
  };

  const onPressOKAlert = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
    //削除しても詳細画面の情報が残っていたためクリアする
    setDetailTodo({});

    Alert.alert("", "Todoを削除しました");
    navigation.goBack();
  };

  const onPressEdit = (index) => {
    // setEditTodo(detailTodo);
    // setIndexForEditTodo(index);

    navigation.navigate("Edit", {
      editTodoBase: todos,
      setTodo: setEditTodo,
      incompleteTodos: incompleteTodos,
      setIncompleteTodos: setIncompleteTodos,
      indexForEditTodo: index,
      navigation: navigation,
    });
  };

  return (
    <SafeAreaView style={styles.detailScreenContainer}>
      <View style={styles.containerTopButton}>
        <Pressable
          style={styles.styleButtonTop}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={20} color={"#00BFFF"} />
          <Text style={styles.textButtonTop}>一覧に戻る</Text>
        </Pressable>
      </View>

      <View style={styles.containerTilte}>
        <Text style={styles.textTitle}>TODO</Text>
      </View>

      <View style={styles.containerButton}>
        <Pressable
          style={styles.styleButtonMain}
          onPress={() => onPressEdit(indexForDetailTodo)}
        >
          <Icon name="pencil" size={18} color="white" />
          <Text style={styles.textButtonMain}>Todoを編集</Text>
        </Pressable>
        <Pressable
          style={styles.styleButtonDelete}
          onPress={() => onPressDelete(indexForDetailTodo)}
        >
          <Icon name="trash" size={18} color="white" />
          <Text style={styles.textButtonMain}>Todoを削除</Text>
        </Pressable>
      </View>

      <View style={styles.styleTodoBoxOutline}>
        <View style={styles.containerUpper}>
          <View style={styles.containerLeft}>
            <CheckBox checked={todos.checked} />
          </View>
          <View style={styles.containerCenter}>
            <View style={styles.ajustCenterItem}>
              <View style={styles.containerCentarUpper}>
                <Text style={styles.textStyle}>{todos.title}</Text>
              </View>
              <View style={styles.containerCenterLower}>
                <Text style={styles.styletextStyleDueday}>
                  <Icon name="clock-o" size={14} color={"#BBBBBB"} />
                  {todos.dueday}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.containerLigth}></View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.containerLower}>
          <ScrollView>
            <View style={styles.ajustLowerItem}>
              <Text style={styles.textStyle}>{todos.commemt}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
