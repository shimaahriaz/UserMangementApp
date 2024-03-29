import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../interface/user.model';

import {MatCardModule} from '@angular/material/card';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: true,
  imports: [MatCardModule, NgIf],
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(+userId).subscribe(
        (data: any) => {
          this.user = data.data;
        },
        (error: any) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }
  goBack(): void {
    window.history.back();
  }
}
