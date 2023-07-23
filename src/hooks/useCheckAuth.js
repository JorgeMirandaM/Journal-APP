

import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/auth/authSlice';
import { FirebaseAuth } from '../firebase/config';
import { startLoadingNotes } from '../store/journal/thunks';

export const useCheckAuth = () => {

    const {status}= useSelector(state=> state.auth);
  const disptach=useDispatch();

  useEffect(() => {

    onAuthStateChanged(FirebaseAuth,async(user)=>{
      if(!user) return disptach(logout());
      const {uid, email,displayName,photoURL}= user;
      disptach(login({uid, email,displayName,photoURL}));
      disptach(startLoadingNotes())

    });
  }, [])

  return status
  
}
