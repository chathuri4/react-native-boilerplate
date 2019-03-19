import { Platform, AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'react-native-firebase';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
import { firebaseConfig, reduxFirebaseConfig } from './firebase/config'
import immutableTransform from 'redux-persist-transform-immutable';


const reactNativeFirebaseConfig = {
  debug: true
};


export default function configureStore(resolve) {

  firebase.initializeApp(firebaseConfig)
  firebase.firestore()

  const middleware = [
     // make getFirebase available in third argument of thunks
    thunk.withExtraArgument({ getFirebase }),
  ];

  const store = createStore(
    makeRootReducer(),
    { firebase: {} }, // initial state
    compose(
      reduxFirestore(firebase),
      reactReduxFirebase(firebase, reduxFirebaseConfig),
      applyMiddleware(...middleware)
    )
  )

  // persistStore(
  //   store,
  //   null,
  //   () => {console.log('persist store')}
  // ).purge().then(() => resolve(store));

  console.log('store return')

  return store
}
