import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../reduxhooks';
import {selectUser, setUser} from '../redux/newUserSlice';
import UserRepository from '../repositories/UserRepository';
import {User} from '../model/User';
import AuthService from '../services/AuthService';
import AsyncStorage from '@react-native-community/async-storage';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidemail, setisValidEmail] = useState(false);
  const [isValidPassword, setisValidPassword] = useState(false);
  const [passwordButton, setpasswordButton] = useState(true);
  const [messageError, setMessageError] = useState('');
  const navigation = useNavigation();

  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const tryAutoLogin = async () => {
      const userInStorage = await AsyncStorage.getItem('user');
      if (userInStorage) {
        const userStored = JSON.parse(userInStorage);
        dispatch(setUser(userStored));
        navigation.navigate('Home');
      }
    };
    tryAutoLogin();
  }, [dispatch, navigation]);

  const handleIsValidEmail = (text: string) => {
    const boolEmail = text.trim().length > 0;
    setisValidEmail(boolEmail);
  };

  const handleIsValidPassword = (text: string) => {
    const boolPassword = text.trim().length > 0;
    setisValidPassword(boolPassword);
  };

  const handleLogin = async () => {
    try {
      const creds = await AuthService.firebaseLogin(email, password);
      if (creds) {
        const userLogged: User = await UserRepository.getUser(creds.user.uid);

        dispatch(setUser(userLogged));
        navigation.navigate('Home');
        AsyncStorage.setItem('user', JSON.stringify(userLogged));
      }
    } catch (error) {
      console.log('error');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <View style={{height: 30}} />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => {
          setEmail(text);
          handleIsValidEmail(text);
        }}
        placeholder="adresse email"
      />
      <View style={{height: 30}} />

      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#DCDCDC',
          borderRadius: 20,
        }}>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={passwordButton}
          onChangeText={text => {
            setPassword(text);
            handleIsValidPassword(text);
          }}
          placeholder="mot de passe"
        />
        <TouchableOpacity onPress={() => setpasswordButton(!passwordButton)}>
          <Icon name="eye" size={20} />
        </TouchableOpacity>
      </View>

      <Text style={{color: 'red'}}>{messageError}</Text>

      <View style={{height: 20}} />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              isValidemail && isValidPassword ? 'orange' : '#DCDCDC',
          },
        ]}
        onPress={handleLogin}
        disabled={!(isValidemail && isValidPassword)}>
        {loading ? (
          <ActivityIndicator size="small" color="gray" />
        ) : (
          <Text style={styles.textButton}>confirmer</Text>
        )}
      </TouchableOpacity>
      <View style={{height: 10}} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.textForRegister}>
          Pas encore de compte ? Inscrivez-vous
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('screen').height / 1.2,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#DCDCDC',
    color: ' black',
    fontSize: 15,
    borderBottomWidth: 0,
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get('screen').width / 1.6,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 0,
    borderRadius: 20,
    alignItems: 'center',
    width: Dimensions.get('screen').width / 1.6,
    height: 30,
    padding: 5,
  },
  textButton: {
    color: 'black',
    fontSize: 15,
  },
  textForRegister: {
    color: 'black',
  },
});
