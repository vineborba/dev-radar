import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, TextInput, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons } from '@expo/vector-icons';
import DevService from '../services/DevService';
import DevMarker from '../components/DevMarker';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 8,
  },
  searchButton: {
    height: 50,
    width: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
});

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [techs, setTechs] = useState('');

  async function initialLoad() {
    const { granted } = await requestPermissionsAsync();
    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      const { longitude, latitude } = coords;

      setCurrentPosition({
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    }
  }

  useEffect(() => {
    initialLoad();
  }, []);

  async function loadDevs() {
    const { latitude, longitude } = currentPosition;
    const data = { latitude, longitude, techs };
    DevService.loadDevs(data)
      .then((loadedDevs) => setDevs(loadedDevs));
  }

  function handleRegionChange(region) {
    setCurrentPosition(region);
  }

  function renderDevMarkers() {
    return devs.map((dev) => (
      <DevMarker
        key={dev._id}
        dev={dev}
        currentPosition={currentPosition}
        navigate={navigation.navigate}
      />
    ));
  }

  if (!currentPosition) {
    return null;
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={currentPosition}
        onRegionChangeComplete={handleRegionChange}
      >
        {renderDevMarkers()}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Devs por tecnologias"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => loadDevs()}
        >
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Main;

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
