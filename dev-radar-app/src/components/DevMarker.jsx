import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Image, View, Text,
} from 'react-native';
import { Marker, Callout } from 'react-native-maps';

const styles = StyleSheet.create({
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff',
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  },
});

function DevMarker({ dev, navigate }) {
  const {
    location, avatarUrl, githubUsername, name, bio, techs,
  } = dev;
  const { coordinates } = location;
  const [longitude, latitude] = coordinates;
  return (
    <Marker
      coordinate={{
        latitude,
        longitude,
      }}
    >
      <Image
        source={{ uri: avatarUrl }}
        style={styles.avatar}
      />
      <Callout onPress={() => navigate('Profile', { githubUsername })}>
        <View style={styles.callout}>
          <Text style={styles.devName}>{name}</Text>
          <Text style={styles.devBio}>{bio}</Text>
          <Text style={styles.devTechs}>{techs.join(', ')}</Text>
        </View>
      </Callout>
    </Marker>
  );
}

export default DevMarker;

DevMarker.propTypes = {
  navigate: PropTypes.func.isRequired,
  dev: PropTypes.shape({
    githubUsername: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    techs: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  }).isRequired,
  currentPosition: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};
