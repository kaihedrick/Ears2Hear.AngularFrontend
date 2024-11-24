/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Navbar Component
 *
 * This component provides a navigation bar for the ears2hear application.
 * It manages user authentication status, enabling dynamic display of login/logout functionality.
 * The navbar serves as a central point for user navigation within the application.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  /**
   * Checks if the user is currently logged in by verifying the presence of a token.
   *
   * @returns A boolean value indicating whether the user is logged in.
   */
  isLoggedIn(): boolean {
    return !!this.apiService.getToken();
  }

  /**
   * Logs the user out by clearing the stored authentication token.
   * After logging out, the user is redirected to the login page.
   */
  logout(): void {
    this.apiService.clearToken();
    this.router.navigate(['/login']); // Redirect to login page
  }
}
