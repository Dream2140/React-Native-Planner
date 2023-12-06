import React, { useEffect, useRef } from "react";
import { Text, Dimensions, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";

import styles from "./mapPicker.styles";
import { LatLng } from "react-native-maps/lib/sharedTypes";

interface MapPickerComponentProps {
  visible: boolean;
  userLocation: LatLng | null;
  selectedLocation: LatLng | null;
  onMapPress: (e: any) => void;
  onClose: () => void;
}

const { height: screenHeight } = Dimensions.get("window");

const MapPicker: React.FC<MapPickerComponentProps> = ({
                                                        visible,
                                                        userLocation,
                                                        selectedLocation,
                                                        onMapPress,
                                                        onClose
                                                      }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const bottomSheetHeight = screenHeight * 0.8;
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

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <MapView
        style={styles.container}
        region={{
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude,
          latitudeDelta: 0.922,
          longitudeDelta: 0.421
        }}
        onPress={onMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }}
            title="Chosen location"
          />
        )}
      </MapView>

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>Click on map to choose location</Text>
      </View>
    </BottomSheetModal>
  );
};

export default MapPicker;
