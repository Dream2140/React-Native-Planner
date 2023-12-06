import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectTasks } from "@store/reducers/tasksReducer/selectors";

import useCurrentLocation from "@hooks/useCurrentLocation";
import { Toolbar } from "@components/toolbar";
import styles from "./mapPage.styles";

// @TODO пофиксить баг, здесь нужно выводить ВСЕ таски а не только те что в стейте
// @TODO так же добавить при клике на флаг что бы показывалась таска
const MapPage = () => {
  const tasks = useSelector(selectTasks);
  const { location } = useCurrentLocation();
  const unfinishedTask = tasks.filter(task => !task.done);

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
        {unfinishedTask.map((task) => (
          <Marker
            key={task.id}
            coordinate={{
              latitude: task.location?.latitude || 0,
              longitude: task.location?.longitude || 0
            }}
            title={task.title}
            description={task.type}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapPage;
