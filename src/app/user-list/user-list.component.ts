// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

import { UserService } from '../service/user.service';
import { User } from '../interface/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, FormsModule],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageNumbers: number[] = [];
  searchTerm: string = '';
  searchResults: User[] = [];
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers(this.currentPage);
  }

  fetchUsers(pageNumber: number): void {
    this.isLoading = true;

    this.userService.getUsers(pageNumber).subscribe(response => {
      this.users = response.data;
      this.totalPages = response.total_pages;
      this.generatePageNumbers();
      this.isLoading = false;
    });
  }

  generatePageNumbers(): void {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchUsers(pageNumber);
  }

  searchUsers(): void {
    if (this.searchTerm.trim() !== '') {
      this.userService.getUser(+this.searchTerm).subscribe(user => {
        if (user) {
          this.searchResults = [user['data']];
          console.log(user['data']['id'])
          console.log(user['data'])
        } else {
          this.searchResults = [];
        }
      });
    } else {
      this.searchResults = [];
    }
  }

  navigateToUserDetail(id: number): void {
    this.router.navigate(['/user', id]);
  }
}

