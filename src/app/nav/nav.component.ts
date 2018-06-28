import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  homeActive = false;
  gabiActive = false;
  profileActive = false;
  plusActive = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  homeSelected() {
    this.homeActive = !this.homeActive;
    this.gabiActive = false;
    this.profileActive = false;
    this.plusActive = false;
    this.router.navigate(['/users']);
  }

  gabiSelected() {
    this.gabiActive = !this.gabiActive;
    this.profileActive = false;
    this.plusActive = false;
    this.homeActive = false;
  }

  profileSelected() {
    this.profileActive = !this.profileActive;
    this.plusActive = false;
    this.homeActive = false;
    this.gabiActive = false;
    this.router.navigate(['/user']);
  }

  plusSelected() {
    this.plusActive = !this.plusActive;
    this.homeActive = false;
    this.gabiActive = false;
    this.profileActive = false;
  }
}
