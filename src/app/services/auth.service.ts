/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 hear Authentication Service
 *
 * This service provides utility methods for managing the user's authentication state.
 * It handles storing and retrieving the logged-in user's information and checks the login status.
 * The service also includes a method to log out and clear user data.
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Stores the currently logged-in user's information or `null` if no user is logged in
  private user: { name: string } | null = null;

  /**
   * Sets the currently logged-in user's information.
   *
   * @param user - An object containing the user's name.
   */
  setUser(user: { name: string }): void {
    this.user = user;
  }

  /**
   * Retrieves the currently logged-in user's information.
   *
   * @returns The user's information object, or `null` if no user is logged in.
   */
  getUser(): { name: string } | null {
    return this.user;
  }

  /**
   * Checks if a user is currently logged in.
   *
   * @returns `true` if a user is logged in, `false` otherwise.
   */
  isLoggedIn(): boolean {
    return !!this.user; // Returns true if `user` is not null
  }

  /**
   * Logs the user out by clearing the stored user information.
   */
  logout(): void {
    this.user = null; // Clear user data in memory
  }
}
