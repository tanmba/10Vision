import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../core/user.service";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {AuthService} from "../core/auth.service";

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
  modal =false;

  constructor(
    private router: Router,
    private authService: AuthService,
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
    this.modal = false;
    this.router.navigate(['/users']);
  }

  gabiSelected() {
    this.gabiActive = !this.gabiActive;
    this.profileActive = false;
    this.plusActive = false;
    this.homeActive = false;
    this.modal = false;
    this.router.navigate(['/my-gabis']);
  }

  profileSelected() {
    this.profileActive = !this.profileActive;
    this.plusActive = false;
    this.homeActive = false;
    this.gabiActive = false;
    this.modal = false;
    this.authService.ifLogged();
  }

  plusSelected() {
    this.plusActive = !this.plusActive;
    this.homeActive = false;
    this.gabiActive = false;
    this.profileActive = false;
    this.modal = !this.modal;
  }

  logout(){
    this.authService.doLogout();
  }
}
