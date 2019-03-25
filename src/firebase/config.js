export const reduxFirebaseConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false,

}

export default { reduxFirebaseConfig }
