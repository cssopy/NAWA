import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {StatusBar} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

StatusBar.setBackgroundColor("rgb(0, 197, 145)");


function App() {
  
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;