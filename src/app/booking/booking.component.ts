import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // นำเข้า Router
import axios from 'axios';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BookingComponent {
  room_number: number | null = null;
  type: string = '';
  people: number | null = null;
  day: string = '';

  private apiUrl = 'http://localhost:3000/api/insert'; // URL สำหรับเพิ่มข้อมูลห้อง

  constructor(private router: Router) {} // เพิ่ม router เข้ามา

  async addRoom(): Promise<void> {
    if (this.room_number === null || this.type === '' || this.people === null || this.day === '') {
      console.error('All fields are required');
      return;
    }

    try {
      const response = await axios.post(this.apiUrl, {
        room_number: this.room_number,
        type: this.type,
        people: this.people,
        day: this.day
      });

      console.log('Room added successfully:', response.data);
      alert('Room added successfully');
      this.clearForm();
    } catch (error) {
      console.error('Error adding room:', error);
    }
  }

  clearForm(): void {
    this.room_number = null;
    this.type = '';
    this.people = null;
    this.day = '';
  }

  navigateToRooms(): void {
    this.router.navigate(['/home']); // ใช้ router.navigate เพื่อไปยังหน้าห้อง
  }
  navigateToroom() {
    this.router.navigate(['/room']); // เส้นทางไปหน้าจองห้อง
  }
}
