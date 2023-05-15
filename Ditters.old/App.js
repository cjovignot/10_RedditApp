import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppBar/>
        <Drawer />
        <Text>Hello my Wankers Team !</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
