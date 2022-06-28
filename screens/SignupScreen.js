import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useContext(AuthContext);

  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
      console.log(token);
    } catch (err) {
      Alert.alert('Authentication Failed', 'Could not create you!');
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating){
    return <LoadingOverlay message='Creating user...'></LoadingOverlay>
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
