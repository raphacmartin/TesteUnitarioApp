/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import axios from 'axios';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Movies from '../src/services/Movies';

it('renders correctly', () => {
  renderer.create(<App />);
});
