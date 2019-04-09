// import { Platform } from 'react-native';
// import { createStore, compose, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/es/storage';
// import thunk from 'redux-thunk';
// import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
// import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
// import makeRootReducer from './reducers';

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
	key: 'root',
	storage,
	transforms: [immutableTransform()],
	blacklist: ['nav'],
	debug: true
}
//
// const persistedReducer = persistReducer(config, makeRootReducer());
// const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })));
//
// const persistConfig = { enhancer };
// const store = createStore(persistedReducer, undefined, enhancer);
// const persistor = persistStore(store, persistConfig, () => {
// 	// console.log('test', store.getState());
// })
//
// const configureStore = () => {
// 	return { persistor, store }
// }
//
// export default configureStore;
//
//
//



import { Platform, AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
import immutableTransform from 'redux-persist-transform-immutable';


const reactNativeFirebaseConfig = {
  debug: true
};


const persistedReducer = persistReducer(config, makeRootReducer())
const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })));
const persistConfig = { enhancer };

export default function configureStore(onAuthReady) {

  const middleware = [
     // make getFirebase available in third argument of thunks
    thunk.withExtraArgument({ getFirebase, getFirestore }),
  ];

  const store = createStore(
    persistedReducer,
    undefined, // initial state
		enhancer
    // compose(
    //   // reduxFirestore(firebase), --> not available for the latest react-redux-firebase
    //   // reactReduxFirebase(firebase, reduxFirebaseConfig), --> not available for the latest react-redux-firebase
    //   applyMiddleware(...middleware)
    // )
  )

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  const persistor = persistStore(store, persistConfig, () => console.log('on store ready'));

  console.log('store return')

  return {persistor, store}
}
