import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signIn() {
    this.authService.signIn(this.user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private-tasks']);
      },
      (err) => console.log(err)
    );
  }
}
