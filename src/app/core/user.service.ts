import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FirebaseUserModel} from "./user.model";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  collection: AngularFirestoreCollection<FirebaseUserModel>;

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
 ){
    this.collection = this.db.collection('users');
 }


  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  getUsers(): Observable<FirebaseUserModel[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as FirebaseUserModel;
          data.uid = a.payload.doc.id;
          return data;
        });
      })
    )
  }

  updateCurrentUser(value){
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
}
