import { Platform, AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore'
// import RNFirebase from 'react-native-firebase';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
import immutableTransform from 'redux-persist-transform-immutable';


const reactNativeFirebaseConfig = {
  debug: true
};


export default function configureStore(INITIALSTATE = {}) {

  // const firebase = RNFirebase.app();

  //
  // firebase.initializeApp(firebaseConfig)
  // firebase.firestore()

  const middleware = [
     // make getFirebase available in third argument of thunks
    thunk.withExtraArgument({ getFirebase, getFirestore }),
  ];

  const store = createStore(
    makeRootReducer(),
    INITIALSTATE, // initial state
    compose(
      // reduxFirestore(firebase), --> not available for the latest react-redux-firebase
      // reactReduxFirebase(firebase, reduxFirebaseConfig), --> not available for the latest react-redux-firebase
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
