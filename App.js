import { StatusBar } from 'expo-status-bar';
import Navigator from './src/navigators/Navigator';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Navigator />
    </>
  );
}