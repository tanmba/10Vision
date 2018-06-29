import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loginForm: FormGroup;
  showLogin: false;
  showRegister: true;
  loadRegister: false;
  loadLogin: false;
  isActive = false;


  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.createFormLogin();
   }

  ngOnInit() {
    this.showRegister = true;
  }

  loadRegisterComponent() {
    this.showRegister = !this.showRegister;
    this.loadRegister = !this.loadRegister;
  }

  loadLoginComponent() {
    this.showLogin = !this.showLogin;
    this.loadLogin = !this.loadLogin;
  }

   showLoginComponent() {
    this.showLogin = !this.showLogin;
    this.showRegister = false;
    this.loadRegister = false;
    this.isActive = !this.isActive;
   }

  showRegisterComponent() {
    this.loadLogin = false;
    this.showRegister = true;
    this.showLogin = false;
    this.isActive = !this.isActive;
  }

  goingBack() {
    this.loadRegister = false;
    this.loadLogin = false;
    this.showRegister = true;
  }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', [Validators.email, Validators.required]],
       password: ['',[Validators.required]],
       nickName: ['', [Validators.minLength(6), Validators.required]],
       displayName: ['', [Validators.minLength(6), Validators.required]],
       city: ['', [Validators.minLength(4), Validators.required]]
     });
   }

  createFormLogin() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

   tryFacebookLogin(){
     this.authService.doFacebookLogin()
     .then(res =>{
       this.router.navigate(['/register-city']);
     }, err => console.log(err)
     )
   }

   tryTwitterLogin(){
     this.authService.doTwitterLogin()
     .then(res =>{
       this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   tryGoogleLogin(){
     this.authService.doGoogleLogin()
     .then(res =>{
       this.router.navigate(['/register-city']);
     }, err => console.log(err)
     )
   }

   tryRegister(){

     const data = this.registerForm.value;
     console.log(data);

     this.authService.doRegister(data)
     .then(res => {
       this.errorMessage = "";
       this.successMessage = "Votre compte a été créé. Connectez-vous !";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
   }

  tryLogin(value){
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/user']);
      }, err => {
        console.log(err);
        this.errorMessage = 'Entrez des informations valides';
      })
  }
}
