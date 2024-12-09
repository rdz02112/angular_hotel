import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // นำเข้า CommonModule
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule], // เพิ่ม CommonModule และ FormsModule ที่นี่
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private router: Router) {}

  async login() {
    try {
      const response = await axios.post(this.apiUrl, {
        username: this.username,
        password: this.password,
      });

      if (response.status === 200) {
        alert('Login successful!');
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      // ตรวจสอบถ้ามีการตอบกลับจากเซิร์ฟเวอร์
      if (error.response && error.response.status === 401) {
        this.errorMessage = error.response.data.message || 'Invalid username or password';
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again.';
      }
      
    }
    
  }
  goToRegister() {
    this.router.navigate(['/register']); // เปลี่ยนไปยังหน้า Register
  }
  
}
