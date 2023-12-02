import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image, Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Toolbar } from "@components/toolbar";
import { ArrowRight, TaskImage } from "@constants/icons-svg";
import styles from "./taskPage.styles";
import Button from "@components/Button/Button";

import Input from "@components/Input/Input";
import { useNavigation, useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { taskTypes } from "@constants/taskTypes";
import { TasksPriorityColor } from "@constants/TasksPriorityColor";
import { COLORS } from "@constants/theme";
import storage from "@react-native-firebase/storage";
import ImagePicker, { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { check, PERMISSIONS } from "react-native-permissions";
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/reducers/userSlice";
import TaskService from "../../services/task.service";
import { TaskModel } from "../../models/task.model";
import { Routes } from "../../router/routes";

// @TODO add RootStackParamList to typing routes
export const TaskPage = () => {

  const [imageUri, setImageUri] = useState<string>("");
  const [selectedType, setSelectedType] = useState<keyof typeof TasksPriorityColor | null>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [taskLoading, setTaskLoading] = useState<boolean>(false);
  // @TODO  add location picker
  const [location, setLocation] = useState<boolean>(false);

  const userInfo = useSelector(selectUserInfo);

  const route = useRoute();

  const taskId = route?.params?.taskId;

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        if (taskId) {
          const task = await TaskService.getTaskById(route.params.taskId);

          if (task) {
            setImageUri(task.image_url || "");
            setTaskName(task.title || "");
            setSelectedType(task.type || null);
            setLocation(task.location || false);
          }
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTaskData();
  }, [taskId]);


  const navigation = useNavigation();

  const handleTypePress = (type: keyof typeof TasksPriorityColor) => {
    setSelectedType(type === selectedType ? null : type);
  };
  const openImagePicker = async () => {

    if (!await check(PERMISSIONS.IOS.CAMERA)) return;

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
      console.error("Error uploading image:", error);
    } finally {
      setImageLoading(false);
    }
  };

  const onSubmitTask = async () => {
    if (!taskName || !selectedType) return;

    setTaskLoading(true);
    try {
      const newTask = {
        image_url: imageUri,
        done: false,
        created_at: String(new Date().getTime()),
        title: taskName,
        type: selectedType,
        user_id: userInfo?.id as string,
        location: location
      };

      if (taskId) {
        await TaskService.editTaskById(taskId, newTask);
        navigation.navigate(Routes.TASKS_LIST as never);
      } else {
        const response = await TaskService.addTask(newTask);

        if (response) {
          setImageUri("");
          setTaskName("");
          setSelectedType(null);
          setLocation(false);
        }
      }
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
          <TouchableOpacity style={styles.locationContainer}
                            onPress={() => setLocation((prevLocation => !prevLocation))}>
            <Checkbox style={styles.locationCheckbox} value={location} />
            <Text style={styles.locationTitle}>
              Add location
            </Text>
          </TouchableOpacity>
          <View style={styles.typeContainer}>
            <Text style={styles.typeTitle}>Type</Text>
            <View style={styles.taskTypes}>
              {Object.keys(TasksPriorityColor).map((type, index) => (
                <TouchableOpacity
                  style={styles.taskTypesItem}
                  key={index}
                  onPress={() => handleTypePress(type)}
                >
                  <View
                    style={[
                      styles.taskTypesMark,
                      { backgroundColor: TasksPriorityColor[type] }
                    ]}
                  />
                  <Checkbox
                    color={selectedType === type ? COLORS.primaryViolent : undefined}
                    style={styles.taskTypesCheckbox}
                    value={selectedType === type}
                    onValueChange={() => handleTypePress(type)}
                  />
                  <Text style={styles.taskTypeName}> {type}</Text>
                </TouchableOpacity>
              ))}
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
