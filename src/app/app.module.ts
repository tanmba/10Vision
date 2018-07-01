import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';

import { MnFullpageModule } from 'ngx-fullpage';
import { SearchComponent } from './search/search.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule }   from '@angular/forms';
import { RegisterCityComponent } from './register-city/register-city.component';
import { GabisParisComponent } from './gabis-paris/gabis-paris.component';
import { GabiToulouseComponent } from './gabi-toulouse/gabi-toulouse.component';
import { GabiNantesComponent } from './gabi-nantes/gabi-nantes.component';
import { GabiMontpelierComponent } from './gabi-montpelier/gabi-montpelier.component';
import { MyGabisComponent } from './my-gabis/my-gabis.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    UserListComponent,
    HomeComponent,
    SearchComponent,
    NavComponent,
    SearchPipe,
    RegisterCityComponent,
    GabisParisComponent,
    GabiToulouseComponent,
    GabiNantesComponent,
    GabiMontpelierComponent,
    MyGabisComponent,
    UserDetailsComponent,
    EditprofileComponent,
    MentionsLegalesComponent,
  ],
  imports: [
    MnFullpageModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    FormsModule
  ],
  providers: [AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
