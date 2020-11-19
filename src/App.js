import React from 'react';
import AppRouter from './router/AppRouter';
import {Provider} from 'react-redux';
import {addDomain} from './actions/users';
import configureStore from './store/configureStore';

const store = configureStore();

const App = () => {
  return (    
      <div className="App">
        <Provider store={store}>
          <AppRouter />
       </Provider>
      </div>
  );
}

export default App;
