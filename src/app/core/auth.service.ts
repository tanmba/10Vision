import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFirestoreDocument, AngularFirestore} from "angularfire2/firestore";
import {FirebaseUserModel} from "./user.model";
import {of} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable()
export class AuthService {
  user$: FirebaseUserModel;

  constructor(
   private afAuth: AngularFireAuth,
   private db: AngularFirestore
 ){
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        console.log(user);
        if (user) {
          return this.db.doc<FirebaseUserModel>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doTwitterLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(data => {
        this.updateUserData(data);
        resolve(data);
      }, err => reject(err))
    })
  }

  async doSignUp(value) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password).then(
      (data) => {
        console.log(data.user);
      }
    )
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<FirebaseUserModel> = this.db.doc(
      `users/${user.uid}`
    );

    const data: FirebaseUserModel = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Utilisateur',
      photoUrl: user.photoUrl || `https://api.adorable.io/avatars/285/${user.uid}`
    };

    return userRef.set(data, { merge: true });
  }


}
