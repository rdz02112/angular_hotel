import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule], // นำเข้า CommonModule และ FormsModule
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:3000/api/register';

  constructor(private router: Router) {}

  async register() {
    try {
      const response = await axios.post(this.apiUrl, {
        username: this.username,
        password: this.password,
        email: this.email,
      });

      if (response.status === 201) {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      // ตรวจสอบถ้ามีการตอบกลับจากเซิร์ฟเวอร์
      if (error.response) {
        this.errorMessage = error.response.data.error || 'An unexpected error occurred.';
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again.';
      }
    }
    
  }
  goToRegister() {
    this.router.navigate(['']); // เปลี่ยนไปยังหน้า Register
  }
}
