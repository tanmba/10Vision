import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";

@Component({
  selector: 'app-gabi-montpelier',
  templateUrl: './gabi-montpelier.component.html',
  styleUrls: ['./gabi-montpelier.component.scss']
})
export class GabiMontpelierComponent implements OnInit {
  users: any[];
  usersCityMontpelier;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;
      const usersFilter = () => {
        return users.filter((el) =>
          el.city == 'Montpelier'
        );
      }
      this.usersCityMontpelier = usersFilter();
    })
  }
}
