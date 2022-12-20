import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {auth} from '../../firebase/config';

import { authSlice } from "./authSlice";

const { updateUserProfile, authStateChange, authSignOut} = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, { displayName: login });

      const { uid, displayName } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log("error.message.sign-up:", error.message);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error.message.sign-in:", error.message);
    }
  };
export const authSignOutUser = () => async (dispatch, getState) => {
try {
  await signOut(auth);
  dispatch(authSignOut());
} catch (error) {
  console.log("error.message.sign-out:", error.message);
}
};

export const authStateChangeUser = () => async (dispatch) => {
   await onAuthStateChanged(auth, (user) => {
   try {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
   } catch (error) {
    console.log("error.message.state-change:", error.message);
   }
  });
};
