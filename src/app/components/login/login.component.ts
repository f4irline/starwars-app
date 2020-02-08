import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Token } from 'src/app/models/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    userName: string;
    password: string;

    errorString: string = '';
    loginFailed: boolean = false;
    hide: boolean = true;

    constructor(
        private apiService: ApiService,
        private router: Router,
    ) {
        if (localStorage.getItem('token')) {
            this.router.navigateByUrl('/home');
        }
    }

    ngOnInit() {
    }

    login() {
        this.apiService.login({userName: this.userName, password: this.password}).subscribe(
            (data) => this.handleLogin(data),
            (err) => this.handleError(err),
        );
    }

    handleLogin(data: Token) {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/home');
    }
    
    handleError(err: any) {
        this.errorString = err.error.msg;
        this.loginFailed = true;
        setTimeout(() => {
          this.loginFailed = false;
        }, 3000);
    }
}
