import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../core/user.service";
import {FirebaseUserModel} from "../core/user.model";
import { Location } from '@angular/common';
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId: string;
  user: Observable<FirebaseUserModel>;
  showEmail =false;
  currentUser: FirebaseUserModel;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location : Location,
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.getUser();

    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    })
    console.log(this.currentUser)
  }

  getUser() {
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(user => {
        this.user = user;
      })
    }
  }

  locationBack() {
    this.location.back();
  }

  addGabi() {
    if (this.currentUser) {
      this.showEmail = !this.showEmail;
    } else {
      this.router.navigate(['/register'])
    }
  }
}
