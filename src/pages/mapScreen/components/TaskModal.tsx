import React, { useEffect, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Dimensions, Image, Pressable, Text, View } from "react-native";


import { TaskModel } from "@models/task.model";
import styles from "./taskModal.styles";
import { CloseIcon, TaskImage } from "@constants/icons-svg";

interface TaskModalProps {
  task: TaskModel | null;
  visible: boolean;
  onClose: () => void;

}

const { height: screenHeight } = Dimensions.get("window");

const bottomSheetHeight = screenHeight * 0.35;

const TaskModal: React.FC<TaskModalProps> = ({
                                               task,
                                               visible,
                                               onClose
                                             }) => {

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = [bottomSheetHeight];

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      onClose();
    }
  };

  if (!task) {
    return null;
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <Pressable onPress={onClose}>
          <CloseIcon style={styles.closeIcon} width={22} height={22} />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        {/* @TODO add loader for image  */}
        {task.image_url ?
          <Image source={{ uri: task.image_url }} height={100} />
          : (<TaskImage width={"100%"} height={100} />)}
      </View>
    </BottomSheetModal>
  );
};

export default TaskModal;
