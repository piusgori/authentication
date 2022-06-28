import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { AuthContext, AuthContextProvider } from './store/auth-context';
import { useContext, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => <IconButton icon='exit' color={tintColor} size={24} onPress={logout}></IconButton>
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack></AuthenticatedStack>}
    </NavigationContainer>
  );
}

const Root = () => {

  const [isTryingLogin, setisTryingLogin] = useState(true)

  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        if(storedToken){
            authenticate(storedToken);
        }
        setisTryingLogin(false)
    }
    fetchToken();
}, [])

if(isTryingLogin){
  return <AppLoading></AppLoading>
}

return <Navigation />

}

export default function App() {


  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root></Root>
      </AuthContextProvider>
    </>
  );
}
