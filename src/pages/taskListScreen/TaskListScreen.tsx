import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Animated, FlatList, PanResponder, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Toolbar } from "@components/toolbar";
import { Filters } from "./Filters";
import { TaskItem, TaskItemProps } from "@components/taskItem/TaskItem";
import Button from "@components/Button/Button";
import { Routes } from "@router/routes";
import {
  resetTaskState, setFilter
} from "@store/reducers/tasksReducer/taskSlice";
import { AppDispatch } from "@store/store";
import {
  selectActiveFilter,
  selectHasNextPage,
  selectLoading,
  selectTaskCount,
  selectTasks
} from "@store/reducers/tasksReducer/selectors";
import { getTaskCountForUserAsync, getTaskListWithParamsAsync } from "@store/reducers/tasksReducer/thunks";
import { selectUserInfo } from "@store/reducers/userSlice";
import { FilterType } from "../../types/filterType";
import { TASK_FILTERS } from "@constants/filters";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@router/router.types";

import styles from "./taskListScreen.styles";

const COUNT_OF_TASKS = 8;

export const TaskListScreen = () => {

  const tasks = useSelector(selectTasks);
  const userInfo = useSelector(selectUserInfo);
  const hasNextPage = useSelector(selectHasNextPage);
  const loading = useSelector(selectLoading);
  const taskCount = useSelector(selectTaskCount);
  const filter = useSelector(selectActiveFilter);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const translateX = useRef(new Animated.Value(0)).current;

  const swipeListHandler = PanResponder.create({
    onStartShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
    onPanResponderMove: Animated.event([null, { dx: translateX }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gestureState) => {
      const newFilterIndex = gestureState.dx > 0 ? -1 : 1;
      const currentIndex = TASK_FILTERS.indexOf(filter);

      if ((newFilterIndex === -1 && currentIndex === 0) || (newFilterIndex === 1 && currentIndex === TASK_FILTERS.length - 1)) {
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false
        }).start();
        return;
      }

      const nextIndex = (currentIndex + newFilterIndex + TASK_FILTERS.length) % TASK_FILTERS.length;
      const nextFilter = TASK_FILTERS[nextIndex];

      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start(() => {
        dispatch(setFilter(nextFilter));
      });
    }
  });

  const fetchTasks = () => {
    if (!hasNextPage || loading) return;
    dispatch(getTaskListWithParamsAsync(COUNT_OF_TASKS));
  };

  const handleTabChange = (activeFilter: FilterType) => {
    dispatch(setFilter(activeFilter));
  };

  useEffect(() => {
    dispatch(getTaskCountForUserAsync(userInfo?.id as string));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetTaskState());
      dispatch(getTaskListWithParamsAsync(COUNT_OF_TASKS));
    }, [filter])
  );

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
      <Animated.View style={styles.swipeContainer}   {...swipeListHandler.panHandlers}>
        <View style={styles.tabsContainer}>
          <Filters activeTab={filter} tabs={TASK_FILTERS} onTabChange={handleTabChange} />
        </View>
        <View style={styles.taskListContainer}>
          <Text style={styles.taskListTitle}>Your Tasks</Text>
          <View>
            {tasks.length === 0 ?
              (<Text> No {filter === "Active" && "active"} tasks yet</Text>)
              : (<FlatList
                data={tasks}
                keyExtractor={(item) => item.created_at}
                renderItem={({ item }) => <TaskItem {...item as TaskItemProps} />}
                onEndReached={fetchTasks}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => (loading ? <ActivityIndicator size="large" /> : null)}
              />)}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};
