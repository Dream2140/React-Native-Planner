import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import useCurrentLocation from "@hooks/useCurrentLocation";
import { Toolbar } from "@components/toolbar";
import styles from "./mapPage.styles";
import { TaskModel } from "@models/task.model";
import taskService from "@services/task.service";
import { selectUserInfo } from "@store/reducers/userSlice";
import { showMessage } from "react-native-flash-message";
import { MapPin } from "@constants/icons-svg";
import TaskModal from "./components/TaskModal";

const maxCountOfTasksToDisplay = 300;
const activeFilterName = "Active";

const MapPage = () => {
  const [tasksList, setTasksList] = useState<TaskModel[]>([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const [clickedTask, setClickedTask] = useState<TaskModel | null>(null);

  const { id: userId } = useSelector(selectUserInfo) ?? { id: "" };

  const { location } = useCurrentLocation();

  useFocusEffect(
    useCallback(() => {
      const fetchTaskList = async () => {
        try {
          const response = await taskService.getTaskListWithParams(userId, activeFilterName, maxCountOfTasksToDisplay);

          if (response) {
            setTasksList(response.tasks);
          }
        } catch (e) {
          showMessage({
            message: "Some error happens while task loading",
            icon: "auto",
            type: "danger"
          });
        }
      };

      fetchTaskList();
    }, [])
  );


  const clickOnTaskHandler = (task: TaskModel) => {
    setClickedTask(task);
    setBottomSheetVisible(true);
  };

  const closeTaskHandler = () => {
    setBottomSheetVisible(false);
  };

  return (
    <View style={styles.container}>
      <Toolbar>
        <Text style={styles.title}>Map</Text>
      </Toolbar>
      <MapView
        style={styles.map}
        region={{
          latitude: location?.latitude as number,
          longitude: location?.longitude as number,
          latitudeDelta: 0.922,
          longitudeDelta: 0.421
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {tasksList.map((task) => (
          <Marker
            key={task.id}
            coordinate={{
              latitude: task.location?.latitude || 0,
              longitude: task.location?.longitude || 0
            }}
            title={task.title}
            description={task.type}
            onPress={() => clickOnTaskHandler(task)}
          >
            <MapPin width={28} height={35} />
          </Marker>
        ))}
      </MapView>

      <TaskModal task={clickedTask} visible={bottomSheetVisible} onClose={closeTaskHandler} />
    </View>
  );
};

export default MapPage;
