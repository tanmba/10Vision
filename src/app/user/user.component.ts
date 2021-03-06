import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
export class UserComponent implements OnInit{
  users: any;
  currentUser: FirebaseUserModel;

  constructor(
    public authService: AuthService,
    private location : Location,
    private userService: UserService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  getCurrentUser() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    })
  }

  logout(){
    this.authService.doLogout();
  }

  updateUserDetails() {
    this.router.navigate(['/update-user'])
  }
}
