import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AuthService from '../services/AuthService';
import {User} from '../model/User';
import UserRepository from '../repositories/UserRepository';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {signupUser} from '../redux/userSlice';
import AsyncStorage from '@react-native-community/async-storage';
import { setUser } from '../redux/newUserSlice';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isValidUsername, setisValidUsername] = useState(false);
  const [isValidEmail, setisValidEmail] = useState(false);
  const [isValidPassword, setisValidPassword] = useState(false);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(false);
  const [passwordButton, setpasswordButton] = useState(true);
  const [passwordConfirmButton, setpasswordConfirmButton] = useState(true);
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     setLoading(false);
  //   }
  // }, [isFocused]);

  const handleIsValidUsername = (text: string) => {
    const regUsername: RegExp = new RegExp(
      /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
    );
    const boolUsername = regUsername.test(text);
    boolUsername
      ? setMessageError('')
      : setMessageError("nom d'utilisateur invalide");
    setisValidUsername(boolUsername);
  };

  const handleIsValidEmail = (text: string) => {
    const regEmail: RegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const boolEmail = regEmail.test(text);
    boolEmail ? setMessageError('') : setMessageError('email invalide');
    setisValidEmail(boolEmail);
  };

  const handleIsValidPassword = (text: string) => {
    const regPassword: RegExp = new RegExp(
      // /^(?=.*?[a-z]).{6,}$/,
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    );
    const boolPassword = regPassword.test(text);
    boolPassword
      ? setMessageError('')
      : setMessageError('mot de passe invalide');
    setisValidPassword(boolPassword);
  };

  const handleIsPasswordConfirm = (text: string) => {
    const boolPassword = password === text;
    boolPassword
      ? setMessageError('')
      : setMessageError('Les deux mots de passe ne sont pas identiques');
    setIsValidPasswordConfirm(boolPassword);
  };

  const handleRegistration = async () => {
    try {
      const creds = await AuthService.firebaseRegistration(email, password);
      if (creds) {
        const user: User = new User(creds.user.uid, username, creds.user.email);
        const userCreated: User = await UserRepository.createUser(user);
        dispatch(setUser(userCreated));
        navigation.navigate('Home');
        AsyncStorage.setItem('user', JSON.stringify(userCreated));
      }
    } catch (error) {
      console.log('error');
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{height: 30}} />

        <View style={{marginTop: -29}}>
          <Text style={styles.titleCondition}>
            Conditions de validation du mot de passe
          </Text>
          <Text style={styles.textCondition}>
            - Au moins une lettre majuscule
          </Text>
          <Text style={styles.textCondition}>
            - Au moins une lettre minuscule
          </Text>
          <Text style={styles.textCondition}>- Au moins un chiffre</Text>
          <Text style={styles.textCondition}>
            - Au moins huit( 8 ) caractères
          </Text>
        </View>
        <View style={{height: 20}} />
        <Text style={styles.title}>Inscription</Text>

        <View style={{height: 30}} />

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={text => {
            setUsername(text);
            handleIsValidUsername(text);
          }}
          placeholder="nom d'utilisateur"
        />

        <View style={{height: 30}} />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => {
            setEmail(text);
            handleIsValidEmail(text);
          }}
          placeholder="email"
        />

        <View style={{height: 30}} />

        <View
          style={{
            flex: 1,
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

        <View style={{height: 30}} />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#DCDCDC',
            borderRadius: 20,
          }}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            secureTextEntry={passwordConfirmButton}
            onChangeText={text => {
              setConfirmPassword(text);
              handleIsPasswordConfirm(text);
            }}
            placeholder="confirmez votre mot de passe"
          />
          <TouchableOpacity
            onPress={() => setpasswordConfirmButton(!passwordConfirmButton)}>
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
                isValidUsername &&
                isValidEmail &&
                isValidPassword &&
                isValidPasswordConfirm
                  ? 'orange'
                  : '#DCDCDC',
            },
          ]}
          onPress={handleRegistration}>
          {loading ? (
            <ActivityIndicator size="small" color="gray" />
          ) : (
            <Text style={styles.textButton}>confirmer</Text>
          )}
        </TouchableOpacity>
        <View style={{height: 10}} />

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textForLogin}>
            Vous avez déjà un compte ? Connectez-vous
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'gray',
    alignItems: 'center',
  },
  logo: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
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
  textForLogin: {
    color: 'black',
  },
  titleCondition: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  textCondition: {
    textAlign: 'justify',
    color: 'black',
    fontSize: 15,
  },
});

export default Register;
