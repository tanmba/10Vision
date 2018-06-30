import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../core/user.service";
import {FirebaseUserModel} from "../core/user.model";
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId: string;
  user: Observable<FirebaseUserModel>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location : Location

  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.getUser();
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
}
