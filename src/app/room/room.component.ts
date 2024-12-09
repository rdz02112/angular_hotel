import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // นำเข้า Router
import axios from 'axios';


@Component({
  selector: 'app-room',
  standalone: true,
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RoomComponent implements OnInit {
  rooms: any[] = [];
  private apiUrl = 'http://localhost:3000/api/read';
  selectedRoom: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getRooms();
  }

  async getRooms(): Promise<void> {
    try {
      const response = await axios.get(this.apiUrl);
      this.rooms = response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  }

  editRoom(room: any): void {
    this.selectedRoom = { ...room };
  }

  async updateRoom(): Promise<void> {
    if (!this.selectedRoom) {
      console.error('No room selected for update');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/update/${this.selectedRoom.id}`, {
        room_number: this.selectedRoom.room_number,
        type: this.selectedRoom.type,
        people: this.selectedRoom.people,
        day: this.selectedRoom.day
      });

      console.log('Room updated successfully:', response.data);
      this.getRooms();
      this.selectedRoom = null;
    } catch (error) {
      console.error('Error updating room:', error);
    }
  }

  async deleteRoom(id: number): Promise<void> {
    try {
      const response = await axios.delete(`http://localhost:3000/api/delete/${id}`);
      console.log('Room deleted successfully:', response.data);
      // Refresh the list of rooms after deletion
      this.getRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
    
  }
  navigateToRooms(): void {
    this.router.navigate(['/home']); // ใช้ router.navigate เพื่อไปยังหน้าห้อง
  }
}
