import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../core/user.service";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  homeActive = false;
  gabiActive = false;
  profileActive = false;
  plusActive = false;

  constructor(
    private router: Router,
    private userService: UserService,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

  homeSelected() {
    this.homeActive = !this.homeActive;
    this.gabiActive = false;
    this.profileActive = false;
    this.plusActive = false;
    this.router.navigate(['/users']);
  }

  gabiSelected() {
    this.gabiActive = !this.gabiActive;
    this.profileActive = false;
    this.plusActive = false;
    this.homeActive = false;
  }

  profileSelected() {
    this.profileActive = !this.profileActive;
    this.plusActive = false;
    this.homeActive = false;
    this.gabiActive = false;
    this.router.navigate(['/user']);

    // var user = firebase.auth().onAuthStateChanged(function(user){
    //   console.log(user)
    //
    //   if (user) {
    //     this.router.navigate(['/user']);
    //   } else {
    //     this.router.navigate(['/register']);
    //   }
    // })
  }

  plusSelected() {
    this.plusActive = !this.plusActive;
    this.homeActive = false;
    this.gabiActive = false;
    this.profileActive = false;
  }
}
