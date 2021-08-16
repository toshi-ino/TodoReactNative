import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { CheckBox, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { deleteTodo } from "../src/graphql/mutations";
import { getTodo } from "../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  detailScreenContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
  conteinarTextCreatedAtUpdatedAt: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginEnd: 40,
  },
  ajustTextCreatedAtUpdatedAt: {
    justifyContent: "flex-end",
  },
  textCreatedAtUpdatedAt: {
    fontSize: 12,
    color: "gray",
  },
});

export default function DetailTodo({ navigation, route }) {
  const { idDetail } = route.params;
  const [todo, setTodo] = useState([]);

  async function getTodoDetail() {
    try {
      const todoData = await API.graphql(
        graphqlOperation(getTodo, { id: idDetail })
      );
      const todoBeforeSet = todoData.data.getTodo;
      setTodo(todoBeforeSet);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    getTodoDetail();
  }, [isFocused]);

  const onPressDelete = (id) => {
    Alert.alert(
      "",
      "Todoを削除しますか？",
      [
        { text: "Ok", onPress: () => onPressOKAlert(id) },
        { text: "キャンセル" },
      ],
      { cancelable: false }
    );
  };

  async function onPressOKAlert(id) {
    await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));

    Alert.alert("", "Todoを削除しました");
    navigation.goBack();
  }

  const onPressEdit = (index) => {
    navigation.navigate("Edit", {
      idEdit: idDetail,
    });
  };

  const indicateDate = (date) => {
    let dateChanged = "";
    if (date == null) {
      dateChanged = "";
    } else if (typeof date === "string") {
      dateChanged = convertFromStringToDate(date);
    } else {
      dateChanged = "";
    }

    return dateChanged;
  };

  const convertFromStringToDate = (responseDate) => {
    let dateComponents = String(responseDate).split("T");
    let datePieces = String(dateComponents[0]).split("-");
    let timePieces = String(dateComponents[1]).split(":");

    let dateDate = new Date(
      datePieces[0],
      datePieces[1] - 1,
      datePieces[2],
      timePieces[0],
      timePieces[1],
      timePieces[2].slice(0, 2)
    );
    dateDate.setHours(dateDate.getHours() + 9);

    let yearStr = dateDate.getFullYear();
    let monthStr = 1 + dateDate.getMonth();
    let dayStr = dateDate.getDate();
    let hourStr = dateDate.getHours();
    let minuteStr = dateDate.getMinutes();
    let secondStr = dateDate.getSeconds();

    monthStr = ("0" + monthStr).slice(-2);
    dayStr = ("0" + dayStr).slice(-2);
    hourStr = ("0" + hourStr).slice(-2);
    minuteStr = ("0" + minuteStr).slice(-2);
    secondStr = ("0" + secondStr).slice(-2);

    let dateChanged =
      yearStr +
      "/" +
      monthStr +
      "/" +
      dayStr +
      " " +
      hourStr +
      ":" +
      minuteStr +
      ":" +
      secondStr;

    return dateChanged;
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
          onPress={() => onPressEdit(idDetail)}
        >
          <Icon name="pencil" size={18} color="white" />
          <Text style={styles.textButtonMain}>Todoを編集</Text>
        </Pressable>
        <Pressable
          style={styles.styleButtonDelete}
          onPress={() => onPressDelete(idDetail)}
        >
          <Icon name="trash" size={18} color="white" />
          <Text style={styles.textButtonMain}>Todoを削除</Text>
        </Pressable>
      </View>

      <View style={styles.styleTodoBoxOutline}>
        <View style={styles.containerUpper}>
          <View style={styles.containerLeft}>
            <CheckBox checked={todo.checked} />
          </View>
          <View style={styles.containerCenter}>
            <View style={styles.ajustCenterItem}>
              <View style={styles.containerCentarUpper}>
                <Text style={styles.textStyle}>{todo.title}</Text>
              </View>
              <View style={styles.containerCenterLower}>
                <Text style={styles.styletextStyleDueday}>
                  <Icon name="clock-o" size={14} color={"#BBBBBB"} />
                  {todo.dueday}
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
              <Text style={styles.textStyle}>{todo.commemt}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.conteinarTextCreatedAtUpdatedAt}>
        <View style={styles.ajustTextCreatedAtUpdatedAt}>
          <Text style={styles.textCreatedAtUpdatedAt}>
            作成日 : {indicateDate(todo.createdAt)}
          </Text>
          <Text style={styles.textCreatedAtUpdatedAt}>
            更新日 : {indicateDate(todo.updatedAt)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
