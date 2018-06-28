import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";

@Component({
  selector: 'app-gabis-paris',
  templateUrl: './gabis-paris.component.html',
  styleUrls: ['./gabis-paris.component.scss']
})
export class GabisParisComponent implements OnInit {
  users: any[];
  usersCityParis;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;
      const usersFilter = () => {
        return users.filter((el) =>
          el.city == 'Paris'
        );
      }
      this.usersCityParis = usersFilter();
    })
  }
}
