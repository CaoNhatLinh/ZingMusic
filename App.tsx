import React from 'react';
import { Provider } from 'react-redux';

import { AppNavigation } from './src/navigation/AppNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { store } from './src/redux/store';
import { AudioProvider } from './src/utils/AudioContext';

const App = () => {
  return (
   
    <Provider store={store}>
       <AudioProvider>
        <AppNavigation />
        </AudioProvider>
    </Provider>
  );
};

export default App;
