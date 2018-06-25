import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  users:any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }
}
