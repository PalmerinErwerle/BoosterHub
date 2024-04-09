import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, addDoc, collection, collectionData, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreBaasService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);


  // AUTH
  getAuth(){
    return getAuth();
  }

  // Log in
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Register
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //Reset password
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  //  Log Out
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
  }


  // ----- BDD -----
  // Collection Get
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
  }

  // Set
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }


  // Get
  async getDocument(path:string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // Post
  postDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  // Update
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  // Delete
  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }
  
}
