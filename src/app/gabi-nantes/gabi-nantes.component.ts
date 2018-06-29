import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";

@Component({
  selector: 'app-gabi-nantes',
  templateUrl: './gabi-nantes.component.html',
  styleUrls: ['./gabi-nantes.component.scss']
})
export class GabiNantesComponent implements OnInit {
  users: any[];
  usersCityNantes;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;
      const usersFilter = () => {
        return users.filter((el) =>
          el.city == 'Nantes'
        );
      }
      this.usersCityNantes = usersFilter();
    })
  }
}
