import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "./taskItem.styles";
import { DeleteIcon, EditIcon, LocationIcon } from "@constants/icons-svg";
import Checkbox from "expo-checkbox";
import { COLORS } from "@constants/theme";
import { TaskType } from "../../types/taskType";
import { TaskModel } from "../../models/task.model";
import { TasksPriorityColor } from "@constants/TasksPriorityColor";
import TaskService from "../../services/task.service";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../router/routes";

interface TaskItemProps extends TaskModel {
  id: string;
}

export const TaskItem: React.FC<TaskItemProps> = (task) => {

  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(task.done);

  const navigation = useNavigation();

  const handleTaskDoneStatus = async (status: boolean) => {
      Alert.alert(
        'Task Update',
        'Do you want to mark this task as done?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const updatedTask = await TaskService.editTaskById(task.id, { done: status });

              if (updatedTask) {
                setCheckBoxValue(prevState => !prevState);
              }
            },
          },
        ],
        { cancelable: false }
      );
  };


  const handleDeleteTask = async () => {
    Alert.alert(
      'Delete task',
      'Do you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await TaskService.deleteTaskById(task.id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleEditTask = () => {
    navigation.navigate("Screens", { screen: Routes.TASK, params: { taskId: task.id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftControls}>
        <View style={[styles.marker, { backgroundColor: TasksPriorityColor[task.type] }]}></View>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            color={checkBoxValue ? COLORS.primaryViolent : undefined}
            style={styles.checkbox}
            value={checkBoxValue}
            onValueChange={handleTaskDoneStatus}
          />
        </View>
      </View>
      <View style={styles.itemInfoContainer}>
        <Text style={styles.itemTitle}>{task.title}</Text>
        <Text style={styles.location}>
          <LocationIcon />
          {task.location}
        </Text>
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlItem} onPress={() => handleDeleteTask()}>
            <DeleteIcon fill={COLORS.primaryViolent} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlItem} onPress={() => handleEditTask()}>
            <EditIcon fill={COLORS.primaryViolent} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
