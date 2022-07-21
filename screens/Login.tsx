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
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidemail, setisValidEmail] = useState(false);
  const [isValidPassword, setisValidPassword] = useState(false);
  const [passwordButton, setpasswordButton] = useState(true);
  const [messageError, setMessageError] = useState('');
  const navigation = useNavigation();

  const handleIsValidEmail = (text: string) => {
    const boolEmail = text.trim().length > 0;
    setisValidEmail(boolEmail);
  };

  const handleIsValidPassword = (text: string) => {
    const boolPassword = text.trim().length > 0;
    setisValidPassword(boolPassword);
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
              isValidemail && isValidPassword ? 'orange' : 'white',
          },
        ]}
        onPress={() => console.log('login')}
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
    // backgroundColor: 'gray',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: 'white',
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
    color: 'white',
  },
});
