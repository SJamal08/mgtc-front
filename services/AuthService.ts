import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default class AuthService {
  public static firebaseRegistration(email: string, password: string) {
    try {
      return auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('rien');
      //   if (error.code === 'auth/email-already-in-use') {
      //     console.log('That email address is already in use!');
      //   }

      //   if (error.code === 'auth/invalid-email') {
      //     console.log('That email address is invalid!');
      //   }
    }
  }

  public static firebaseLogin(email: string, password: string) {
    try {
      return auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('rien');
      //   if (error.code === 'auth/email-already-in-use') {
      //     console.log('That email address is already in use!');
      //   }

      //   if (error.code === 'auth/invalid-email') {
      //     console.log('That email address is invalid!');
      //   }
    }
  }
}
