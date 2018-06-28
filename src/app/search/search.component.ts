import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  users: any[];

  //Paris
  usersCityParis;
  showParis: false;

  //Toulouse
  usersCityToulouse;
  showToulouse: false;

  //Nantes
  usersCityNantes;
  showNantes: false;

  //Montpelier
  usersCityMontpelier;
  showMontpelier: false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  getUserByCity(data) {
    console.log(data)
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;

      if (data === '1') {
        this.router.navigateByUrl('/gabis-paris');
      } else if (data === '2') {
        this.getUsersByCityToulouse()
      } else if (data === '3') {
        this.getUsersByCityNantes()
      } else if (data === '4') {
        this.getUsersByCityMontpelier()
      }
    })
  }

  getUsersByCityToulouse() {
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;
      const usersFilter = () => {
        return users.filter((el) =>
          el.city == 'Toulouse'
        );
      }
      this.usersCityToulouse = usersFilter();
      this.showToulouse = !this.showMarseille
    })
  }

  getUsersByCityNantes() {
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;
      const usersFilter = () => {
        return users.filter((el) =>
          el.city == 'Nantes'
        );
      }
      this.usersCityNantes = usersFilter();
      this.showNantes = !this.showNantes
    })
  }

  getUsersByCityMontpelier() {
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;
      const usersFilter = () => {
        return users.filter((el) =>
          el.city == 'Montpelier'
        );
      }
      this.usersCityMontpelier = usersFilter();
      this.showMontpelier = !this.showMontpelier
    })
  }
}
