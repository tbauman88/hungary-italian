import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  type User,
  type UserCredential,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = async (): Promise<void> => {
  return signOut(auth)
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

export const updateUserEmail = async (user: User, newEmail: string): Promise<void> => {
  return updateEmail(user, newEmail)
}

export const updateUserPassword = async (user: User, newPassword: string): Promise<void> => {
  return updatePassword(user, newPassword)
}

export const reauthenticateUser = async (user: User, currentPassword: string): Promise<UserCredential> => {
  if (!user.email) {
    throw new Error('User email is required for reauthentication')
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword)
  return reauthenticateWithCredential(user, credential)
}

export default app 
