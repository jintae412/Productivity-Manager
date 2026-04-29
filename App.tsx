import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/features/store';

export default function App() {
    return (
		<Provider store={store}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<NavigationContainer>
						<StatusBar style="auto" />
						<RootNavigator />
					</NavigationContainer>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</Provider>
    );
}
