import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import {FormGroup, FormBuilder} from "@angular/forms";

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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  getUserByCity(data) {
    console.log(data)
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;

      if (data === '1') {
        this.getUsersByCityParis();
        this.showNantes = false;
        this.showToulouse = false;
        this.showMontpelier = false;
      } else if (data === '2') {
        this.getUsersByCityToulouse()
        this.showNantes = false;
        this.showParis = false;
        this.showMontpelier = false;
      } else if (data === '3') {
        this.getUsersByCityNantes()
        this.showToulouse = false;
        this.showParis = false;
        this.showMontpelier = false;
      } else if (data === '4') {
        this.getUsersByCityMontpelier()
        this.showToulouse = false;
        this.showParis = false;
        this.showNantes = false;
      }
    })
  }

  getUsersByCityParis() {
    this.userService.getUsersByCity().subscribe(users => {
      this.users = users;
      const usersFilter = () => {
        return users.filter((el) =>
          el.city == 'Paris'
        );
      }
      this.usersCityParis = usersFilter();
      this.showParis = !this.showParis
      console.log(this.usersCityParis)
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
      console.log(this.usersCityToulouse)
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
      console.log(this.usersCityNantes)
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
      console.log(this.usersCityMontpelier)
    })
  }

  trackByFn(index) {
    return index;
  }
}
