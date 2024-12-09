import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToBooking() {
    this.router.navigate(['/booking']); // เส้นทางไปหน้าจองห้อง
  }
  navigateTologout() {
    this.router.navigate(['']); // เส้นทางไปหน้าจองห้อง
  }


}
