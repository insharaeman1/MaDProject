import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import MapView, { Marker, Circle, Polyline } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);

  // Fetch User Location on App Load
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied!");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const userRegion = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      setRegion(userRegion);
    })();
  }, []);

  // Update map when marker dragged
  const onMarkerDragEnd = (e) => {
    const newCoord = e.nativeEvent.coordinate;

    setLocation(newCoord);
    setRegion({
      ...region,
      latitude: newCoord.latitude,
      longitude: newCoord.longitude,
    });
  };

  if (!region) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <MapView style={styles.map} region={region}>
      {/* Marker */}
      <Marker
        coordinate={location}
        draggable
        onDragEnd={onMarkerDragEnd}
      >
        <MapView.Callout>
          <View>
            <Text>Your Name: Inshara Eman{"\n"}Reg #: CIIT-FA21-BCS-000</Text>
          </View>
        </MapView.Callout>
      </Marker>

      {/* Circle of 50m */}
      <Circle
        center={location}
        radius={50}
        strokeColor="rgba(0,0,255,0.7)"
        fillColor="rgba(0,0,255,0.2)"
      />

      {/* Line from Center */}
      <Polyline
        coordinates={[
          location,
          { latitude: location.latitude + 0.0005, longitude: location.longitude }
        ]}
        strokeWidth={3}
        strokeColor="red"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
