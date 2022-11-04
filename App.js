import { StatusBar } from 'expo-status-bar';
import Login from './screens/Login';
import Signup from './screens/Signup';
import EmailVerification from './screens/EmailVerification';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import Dashboard from './screens/Dashboard';
import RootStack from './navigators/RootStack';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <RootStack />
    </>
  );
}