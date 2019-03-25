import { Platform, AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
import immutableTransform from 'redux-persist-transform-immutable';


const reactNativeFirebaseConfig = {
  debug: true
};


export default function configureStore(onStoreReady) {

  const middleware = [
     // make getFirebase available in third argument of thunks
    thunk.withExtraArgument({ getFirebase, getFirestore }),
  ];

  const store = createStore(
    makeRootReducer(),
    {}, // initial state
    compose(
      // reduxFirestore(firebase), --> not available for the latest react-redux-firebase
      // reactReduxFirebase(firebase, reduxFirebaseConfig), --> not available for the latest react-redux-firebase
      applyMiddleware(...middleware)
    )
  )

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  persistStore(store, null, ()=> console.log('store is ready'));


  console.log('store return')

  return store
}
