import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../core/user.service";
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'app-register-city',
  templateUrl: './register-city.component.html',
  styleUrls: ['./register-city.component.scss']
})
export class RegisterCityComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  currentUser: FirebaseUserModel;
  users: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
      city: ['', [Validators.minLength(4), Validators.required]]
    });
  }

  updateCurrentUserCity(){

    const data = this.registerForm.value;
    console.log(data);

    this.authService.doUpdate(data)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }
}
