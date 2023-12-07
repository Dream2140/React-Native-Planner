import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image, Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import storage from "@react-native-firebase/storage";
import { showMessage } from "react-native-flash-message";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { LatLng } from "react-native-maps/lib/sharedTypes";

import { Toolbar } from "@components/toolbar";
import { ArrowRight, TaskImage } from "@constants/icons-svg";
import styles from "./taskPage.styles";
import Button from "@components/Button/Button";

import { taskPriorityColors, TaskPriorityTypes } from "@constants/TasksPriorityColor";
import { COLORS } from "@constants/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "@store/reducers/userSlice";
import TaskService from "@services/task.service";
import { Routes } from "@router/routes";
import { AppDispatch } from "@store/store";
import { addTaskAsync, editTaskAsync } from "@store/reducers/tasksReducer/thunks";
import MapPicker from "./mapPicker/MapPicker";
import useCurrentLocation from "@hooks/useCurrentLocation";
import { showConfirmAlert } from "../../helpers/showConfirmAlert";
import LocationService from "@services/location.service";
import { LocationType } from "../../types/taskTypes";
import { replaceUndefinedWithNull } from "../../helpers/replaceUndefinedWithNull";
import { TabParamList } from "@router/router.types";
import { TaskModel } from "@models/task.model";

type TaskPageRouterType = {
  params: {
    taskId: string;
  }
}

export const TaskPage = () => {


  const [imageUri, setImageUri] = useState<string>("");
  const [selectedType, setSelectedType] = useState<TaskPriorityTypes | null>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [taskLoading, setTaskLoading] = useState<boolean>(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const [taskLocation, setTaskLocation] = useState<LocationType | null>(null);

  const userInfo = useSelector(selectUserInfo);

  const route = useRoute<RouteProp<TaskPageRouterType>>();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<TabParamList>>();
  const { location } = useCurrentLocation();

  const taskId = route?.params?.taskId;


  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (taskId) {
          const task = await TaskService.getTaskById(taskId);

          if (task) {
            setImageUri(task.image_url || "");
            setTaskName(task.title || "");
            setSelectedType(task.type || null);
            setSelectedLocation(task.location || null);
          }
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    setTimeout(() => {
      showConfirmAlert(
        {
          title: "Confirm location", message: "Do you confirm the choice of location?",
          okHandler: () => handleLocationConfirm(latitude, longitude)
        });
    }, 500);
  };

  const handleLocationConfirm = async (latitude: number, longitude: number) => {
    setBottomSheetVisible(false);
    const locationName = replaceUndefinedWithNull(await LocationService.getLocationByCoordinates(latitude, longitude));
    setTaskLocation(locationName);
  };

  const handleCloseMapPickerModal = () => {
    setBottomSheetVisible(false);
  };

  const handleTypePress = (type: TaskPriorityTypes) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const openImagePicker = async () => {

    const cameraPermissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

    if (cameraPermissionStatus === RESULTS.DENIED) {
      const permissionRequestResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (permissionRequestResult !== RESULTS.GRANTED) {
        showMessage({
          message: "Camera permission denied. Please Try again",
          icon: "auto",
          type: "danger"
        });
        console.log("Camera permission denied.");
        return;
      }
    }

    const options = {
      mediaType: "photo",
      quality: 0.1
    };

    const result = await launchImageLibrary(options as ImageLibraryOptions);


    if (result.errorCode) {
      console.log("Image picker cancelled:", result.errorMessage);
    } else {
      if (result && result.assets) {
        await uploadImage(result.assets[0].uri as string, result.assets[0].fileName as string);
      }
    }
  };

  const uploadImage = async (uri: string, imageName: string) => {
    const reference = storage().ref(`images/${imageName}`);
    setImageLoading(true);
    try {
      await reference.putFile(uri);
      console.log("Image uploaded successfully!");

      const downloadURL = await reference.getDownloadURL();
      console.log("Image URL:", downloadURL);

      setImageUri(downloadURL);
    } catch (error) {
      showMessage({
        message: "Error loading image",
        icon: "auto",
        type: "danger"
      });
      console.error("Error uploading image:", error);
    } finally {
      setImageLoading(false);
    }
  };

  const onSubmitTask = async () => {

    if (!taskName || !selectedType) return;

    setTaskLoading(true);

    try {
      const updatedTask: TaskModel = {
        image_url: imageUri,
        done: false,
        created_at: Number(new Date().getTime()),
        title: taskName,
        type: selectedType,
        user_id: userInfo?.id as string,
        location: taskLocation,
        completed_at: null
      };

      if (taskId) {
        dispatch(editTaskAsync({ taskId, updatedTask }));

        showMessage({
          message: `Task "${updatedTask.title}" successfully updated`,
          icon: "auto",
          type: "success"
        });
      } else {
        dispatch(addTaskAsync(updatedTask));
      }
      navigation.navigate(Routes.TASKS_LIST);
    } catch (e) {
      console.log(e);
    } finally {
      setTaskLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Toolbar>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => navigation.goBack()}
                     style={({ pressed }) => [
                       {
                         backgroundColor: pressed ? COLORS.yellow : "transparent"
                       },
                       styles.arrowBack
                     ]}
          >
            {({ pressed }) => (
              <ArrowRight stroke={pressed ? COLORS.darkBlue : COLORS.white} />
            )}
          </Pressable>
          <Text style={styles.headerTitle}>Add new task</Text>
        </View>
      </Toolbar>

      <View style={styles.taskContainer}>
        <View>
          <View style={styles.imageContainer}>
            {/* @TODO add loader for image  */}
            {imageUri ?
              <Image source={{ uri: imageUri }} height={150} />
              : (<TaskImage width={"100%"} height={150} />)}
          </View>
          <View style={styles.addPhotoContainer}>
            <Button containerStyle={styles.addPhotoBtn} onPress={openImagePicker}>
              {imageLoading ? <ActivityIndicator size="small" color={COLORS.primaryViolent} /> : (
                <Text style={styles.addPhotoText}>+ Add photo</Text>)}
            </Button>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "space-around", paddingBottom: 30 }}>
          <View style={styles.taskNameContainer}>
            <Text style={styles.taskNameTitle}>Task name</Text>
            <TextInput inputMode="text" style={styles.taskNameInput} value={taskName} onChangeText={(text) => {
              setTaskName(text);
            }} />
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.typeTitle}>Event location</Text>
            <Button onPress={() => setBottomSheetVisible(true)} containerStyle={styles.locationBtn}>
              <Text style={styles.locationBtnText}>Add location</Text>
            </Button>
            {taskLocation && (
              <Text style={styles.locationTitle}>{taskLocation.formattedAddress}</Text>
            )}
            <MapPicker
              visible={bottomSheetVisible}
              userLocation={location}
              selectedLocation={selectedLocation}
              onMapPress={handleMapPress}
              onClose={handleCloseMapPickerModal}
            />
          </View>

          <View style={styles.typeContainer}>
            <Text style={styles.typeTitle}>Type</Text>
            <View style={styles.taskTypes}>
              {Object.keys(taskPriorityColors).map((type, index) => {
                const eventType = type as TaskPriorityTypes;
                return (
                  <TouchableOpacity
                    style={styles.taskTypesItem}
                    key={index}
                    onPress={() => handleTypePress(eventType)}
                  >
                    <View
                      style={[
                        styles.taskTypesMark,
                        { backgroundColor: taskPriorityColors[eventType] }
                      ]}
                    />
                    <Checkbox
                      color={selectedType === eventType ? COLORS.primaryViolent : undefined}
                      style={styles.taskTypesCheckbox}
                      value={selectedType === eventType}
                      onValueChange={() => handleTypePress(eventType)}
                    />
                    <Text style={styles.taskTypeName}> {type}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <Button disabled={imageLoading || taskLoading} containerStyle={styles.taskSubmitBtn}
                  onPress={onSubmitTask}>
            {taskLoading ? <ActivityIndicator size="small" color={COLORS.primaryViolent} /> : (
              <Text style={styles.taskSubmitBtnText}>Save</Text>)}
          </Button>
        </View>
      </View>
    </View>
  );
};
