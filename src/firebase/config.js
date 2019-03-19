export const firebaseConfig = {
  apiKey: 'AIzaSyCfU3Am-T3EeoaVz0szw-WdANpBBV8CvGI',
  authDomain: 'test-10157.firebaseapp.com',
  databaseURL: 'https://test-10157.firebaseio.com',
  projectId: 'test-10157',
  storageBucket: 'test-10157.appspot.com',
  messagingSenderId: 'project-958148475415'
}

export const reduxFirebaseConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false
}

export default { firebaseConfig, reduxFirebaseConfig }
