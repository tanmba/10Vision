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
        this.router.navigateByUrl('/gabis-toulouse')
      } else if (data === '3') {
        this.router.navigateByUrl('/gabis-nantes')
      } else if (data === '4') {
        this.router.navigateByUrl('/gabis-montpelier')
      }
    })
  }
}
