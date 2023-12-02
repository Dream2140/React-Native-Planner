import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Toolbar } from "@components/toolbar";

import styles from "./taskListScreen.styles";
import { Tabs } from "./Tabs";
import { TaskItem } from "@components/taskItem/TaskItem";
import { mockTasks } from "../../mock/taskListData";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Button from "@components/Button/Button";
import firestore from "@react-native-firebase/firestore";
import { Routes } from "../../router/routes";
import TaskService from "../../services/task.service";
import { TaskModel } from "../../models/task.model";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/reducers/userSlice";

const TABS = ["Active", "Completed", "All"];

const COUNT_TASKS = 8;

export const TaskListScreen = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [tasks, setTasks] = useState<TaskModel[]>();
  const userInfo = useSelector(selectUserInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [lastVisible, setLastVisible] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const navigation = useNavigation();
  const fetchTasks = async () => {
    setLoading(true);
    try {
      if (!userInfo || !hasNextPage) return;

      const loadedTasks = await TaskService.getTasksByUserId(userInfo.id, COUNT_TASKS, lastVisible);

      if (tasks && tasks.length > 0) {
        setTasks([...tasks, ...loadedTasks.tasks]);
      } else {
        setTasks(loadedTasks.tasks);
      }
      setHasNextPage(loadedTasks.hasNextPage);
      setLastVisible(loadedTasks.tasks.length > 0 ? loadedTasks.tasks[loadedTasks.tasks.length - 1].created_at : null);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getTasksCount = async ()=>{
    if (!userInfo) return;
    const response = await TaskService.getTaskCountForUser(userInfo?.id );
    console.log(response);
    setTaskCount(response);
  }


  useFocusEffect(
    useCallback(() => {
      fetchTasks();
      getTasksCount();
    }, [userInfo])
  );

  const filterTasks = (activeTab: String) => {
    if (!tasks) return;

    switch (activeTab) {
      case "Active":
        return tasks.filter(task => !task.done);
      case "Completed":
        return tasks.filter(task => task.done);
      default:
        return tasks;
    }
  };

  const filteredTasks = filterTasks(activeTab);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <Toolbar>
        <View style={styles.headerTop}>
          <Text style={styles.helloText}>Hello, there {userInfo?.email}</Text>
          <Button onPress={() => navigation.navigate("Screens", { screen: Routes.TASK })}
                  containerStyle={styles.button}>
            <Text style={styles.buttonText}>+ Add task</Text>
          </Button>
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.titleText}>You have{"\n"}{taskCount} tasks here</Text>
        </View>
      </Toolbar>
      <View style={styles.tabsContainer}>
        <Tabs activeTab={activeTab} tabs={TABS} onTabChange={handleTabChange} />
      </View>
      <View style={styles.taskListContainer}>
        <Text style={styles.taskListTitle}>Your Tasks</Text>
        <View style={styles.taskList}>
          <FlatList
            data={filteredTasks}
            onRefresh={() => fetchTasks()}
            refreshing={loading}
            keyExtractor={(item) => item.created_at}
            renderItem={({ item }) => <TaskItem {...item} />}
            onEndReached={fetchTasks}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => (loading ? <ActivityIndicator size="large" /> : null)}
          />
        </View>
      </View>
    </View>
  );
};
