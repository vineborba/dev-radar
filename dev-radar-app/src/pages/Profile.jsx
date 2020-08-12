import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

const GITHUB_BASE_URL = 'https://github.com';

function Profile({ navigation }) {
  const [githubUsername] = useState(navigation.getParam('githubUsername'));
  return <WebView style={{ flex: 1 }} source={{ uri: `${GITHUB_BASE_URL}/${githubUsername}` }} />;
}

export default Profile;

Profile.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
