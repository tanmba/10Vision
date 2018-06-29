import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";

@Component({
  selector: 'app-gabi-toulouse',
  templateUrl: './gabi-toulouse.component.html',
  styleUrls: ['./gabi-toulouse.component.scss']
})
export class GabiToulouseComponent implements OnInit {
  users: any[];
  usersCityToulouse;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;
      const usersFilter = () => {
        return users.filter((el) =>
          el.city == 'Toulouse'
        );
      }
      this.usersCityToulouse = usersFilter();
    })
  }
}
