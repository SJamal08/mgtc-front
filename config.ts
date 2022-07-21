import Config from 'react-native-config';

var API_URL = '';

if (Config.APP_ENV === 'local') {
  API_URL = 'test';
} else if (Config.APP_ENV === 'external'){
  API_URL = 'essai';
}

export default API_URL;
