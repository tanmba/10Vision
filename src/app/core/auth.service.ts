import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFirestoreDocument, AngularFirestore} from "angularfire2/firestore";
import {FirebaseUserModel} from "./user.model";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Router} from "@angular/router";
import {UserService} from "../core/user.service";

@Injectable()
export class AuthService {
  user$: FirebaseUserModel;

  constructor(
   private afAuth: AngularFireAuth,
   private db: AngularFirestore,
   private router: Router,
    private userService: UserService

){
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
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
      .then(data => {
        const isNewUser = data.additionalUserInfo.isNewUser;

        if (isNewUser) {
          this.updateUserData(data.user).then(() => {
            this.router.navigateByUrl('/register-city');
          });
        } else {
          this.router.navigateByUrl('/register-city');
        }
        resolve(data);
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
      .then(data => {
        const isNewUser = data.additionalUserInfo.isNewUser;

        if (isNewUser) {
          this.updateUserData(data.user).then(() => {
            this.router.navigateByUrl('/register-city');
          });
        } else {
          this.router.navigateByUrl('/register-city');
        }
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(val) {
    const nickName = val.nickName;
    const city = val.city;
    const displayName = val.displayName;

    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(val.email, val.password)
      .then(data => {
        this.updateUserData(data, nickName, city, displayName);
        resolve(data);
      }, err => reject(err))
    })
  }

  doUpdate(val) {

    const city = val.city;
    const nickname = val.nickName

    this.user$.subscribe(user => {
      if (user) {
        let currentUser: FirebaseUserModel = user;

        console.log(currentUser);

        currentUser.city = city;
        currentUser.nickName = nickname

        this.userService.updateUser(currentUser);

        console.log('ok');

      } else {
        console.log('aucun utilisateur trouvé');
      }

    });

    return new Promise<any>((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(data => {
          this.updateUserData(data, city);
          resolve(data);
        }, err => reject(err))
    })
  }

  doUpdateProfile(val) {
    const city = val.city;
    const nickname = val.nickName;
    const email = val.email;

    this.user$.subscribe(user => {
      if (user) {
        let currentUser: FirebaseUserModel = user;

        console.log(currentUser);

        currentUser.city = city;
        currentUser.nickName = nickname;
        currentUser.email = email;

        this.userService.updateUser(currentUser);

        console.log('ok');

      } else {
        console.log('aucun utilisateur trouvé');
      }

    });

    return new Promise<any>((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(data => {
          this.updateUserData(data, city, nickname, email);
          resolve(data);
        }, err => reject(err))
    })
  }

  ifLogged() {
    this.user$.subscribe(user => {
      if (user) {
        let userLog: FirebaseUserModel = user;
        console.log(userLog);
        this.router.navigate(['/user']);
      } else {
        this.router.navigate(['/register']);
      }
    });
  }

  ifLoggedAdd() {
    this.user$.subscribe(user => {
      let user = user;
      console.log(user);
    });
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
    this.afAuth.auth.signOut()
      .then(res => {
        this.router.navigate(['/home']);
      },err => console.log(err))
  }

  private updateUserData(user, nickName, city) {
    const userRef: AngularFirestoreDocument<FirebaseUserModel> = this.db.doc(
      `users/${user.uid}`
    );

    const data: FirebaseUserModel = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Utilisateur',
      photoUrl: user.photoUrl || `https://api.adorable.io/avatars/285/${user.uid}`,
      nickName: user.nickName || 'Anonyme',
      city: user.city || 'Pas de ville',
    };

    return userRef.set(data, { merge: true });
  }


}
