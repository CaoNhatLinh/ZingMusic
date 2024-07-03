import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { AppNavigation } from './src/navigation/AppNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
