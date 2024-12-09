import { Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'room', component: RoomComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
];
