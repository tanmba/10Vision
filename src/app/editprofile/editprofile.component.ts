import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";
import {UserService} from "../core/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirebaseUserModel} from "../core/user.model";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  users: any;
  currentUser: FirebaseUserModel;
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
      nickName: ['', [Validators.minLength(4), Validators.required]],
      email: ['', Validators.required ],
      city: ['', [Validators.minLength(4), Validators.required]]
    });
  }

  updateUserProfile(){
    const data = this.registerForm.value;
    console.log(data);

    this.authService.doUpdateProfile(data)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Votre profil a été mis à jour !";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
    this.router.navigateByUrl('/user');
  }
}
