// user-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserService } from '../service/user.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '../interface/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
  });

  it('should generate page numbers', () => {
  });

  it('should navigate to user detail', () => {
  });

  it('should search users', () => {
    const searchTerm = 'Janet';
    const user: User = { id: 2, first_name: 'Janet', last_name: 'Weaver', avatar: 'https://reqres.in/img/faces/2-image.jpg', email: 'janet.weaver@reqres.in' };
    spyOn(userService, 'getUser').and.returnValue(of(user));

    component.searchTerm = searchTerm;
    component.searchUsers();

    console.log('Search Results:', component.searchUsers());

    expect(component.searchResults).toEqual([user]);
  });


  it('should reset search results when search term is empty', () => {
    component.searchResults = [{ id: 1, first_name: 'John', last_name: 'Doe', avatar: 'avatar-url', email: 'john@example.com' }];

    component.searchTerm = '';
    component.searchUsers();

    expect(component.searchResults).toEqual([]);
  });

  it('should go to page', () => {
    const pageNumber = 2;
    const users: User[] = [
      { id: 3, first_name: 'Alice', last_name: 'Smith', avatar: 'avatar-url', email: 'alice@example.com' },
      { id: 4, first_name: 'Bob', last_name: 'Johnson', avatar: 'avatar-url', email: 'bob@example.com' }
    ];
    spyOn(userService, 'getUsers').and.returnValue(of({ data: users, total_pages: 2 }));

    component.goToPage(pageNumber);

    expect(component.currentPage).toEqual(pageNumber);
    expect(component.users).toEqual(users);
  });
});
