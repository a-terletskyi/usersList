import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  login = '';
  password = '';
  email = '';
  userIndex!: number;
  loginErrMessage!: string;
  passwordErrMessage!: string;
  emailErrMessage!: string;
  usersList: Array<any> = [];
  isBtn = false; isValid = false;

  constructor() { }
  ngOnInit(): void { }

  addUser(regForm: HTMLFormElement): void {
    this.checkValidity();
    if (this.isValid) {
      const user = { login: this.login, password: this.password, email: this.email };
      this.usersList.push(user);
      regForm.reset();
    }
  }

  editUser(index: number): void {
    this.userIndex = index;
    this.isBtn = true;
    this.login = this.usersList[index].login;
    this.password = this.usersList[index].password;
    this.email = this.usersList[index].email;
  }

  deleteUser(index: number): void { this.usersList.splice(index, 1) }

  saveEditUser(regForm: HTMLFormElement): void {
    this.checkValidity();
    if (this.isValid) {
      const user = { login: this.login, password: this.password, email: this.email };
      this.usersList.splice(this.userIndex, 1, user);
      this.isBtn = false;
      regForm.reset();
    }
  }

  checkValidity(): void {
    const loginRegExp: boolean = /^[a-zA-z]{4,16}$/.test(this.login);
    const passwordRegExp: boolean = /^[\w\_\-\.]{4,16}$/.test(this.password);
    const emailRegExp: boolean = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
    this.isValid = false;
    if (loginRegExp && emailRegExp && passwordRegExp) this.isValid = true;
    if (this.login === '') { this.loginErrMessage = 'Login cannot be blank' }
    else if (!loginRegExp) { this.loginErrMessage = 'Please provide a valid Login.' } else { this.loginErrMessage = '' }
    if (this.password === '') { this.passwordErrMessage = 'Password cannot be blank' }
    else if (!passwordRegExp) { this.passwordErrMessage = 'Please provide a valid Password.' } else { this.passwordErrMessage = '' }
    if (this.email === '') { this.emailErrMessage = 'Email address cannot be blank' }
    else if (!emailRegExp) { this.emailErrMessage = 'Please provide a valid Email address.' } else { this.emailErrMessage = '' }
  }
}