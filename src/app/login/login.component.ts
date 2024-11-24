import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.loginUser(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Save the token in localStorage
        this.apiService.saveToken(response.token);
        console.log('Received token:', response.token);

        // Redirect to the home page
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loginError = 'Invalid username or password';
      },
    });
  }
}
