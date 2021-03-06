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

  getUser(uid): Observable<FirebaseUserModel> {

    const userId = uid;

    return this.collection
      .doc<FirebaseUserModel>(`/${userId}`)
      .snapshotChanges()
      .pipe(
        map(a => {
          const item = a.payload.data() as T;
          // item.uid = a.payload.id;
          return item;
        })
      );
  }

  getUsersByCity(): Observable<FirebaseUserModel> {
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

  updateUser(user: FirebaseUserModel) {
    console.log(user);
    return this.collection.doc(user.uid).update(user);
  }
}
