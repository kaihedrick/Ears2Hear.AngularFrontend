/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear API Service
 *
 * This service acts as a bridge between the Angular application and the backend API.
 * It handles HTTP requests for authentication, user data, and track-related operations.
 * It also manages token-based authentication using LocalStorage and provides utility methods for working with JWTs.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Base URL for backend API
  private baseUrl = 'http://localhost:3000/api';

  // LocalStorage key used for storing the authentication token
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  /**
   * Logs in the user by sending their credentials to the backend API.
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @returns An Observable of the HTTP response.
   */
  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  /**
   * Retrieves the authentication token from LocalStorage.
   * @returns The token as a string, or null if it doesn't exist.
   */
  getToken(): string | null {
    return this.localStorageService.getItem('authToken');
  }

  /**
   * Saves the authentication token to LocalStorage.
   * @param token - The token to save.
   */
  saveToken(token: string): void {
    this.localStorageService.setItem('authToken', token);
  }

  /**
   * Clears the authentication token from LocalStorage.
   */
  clearToken(): void {
    this.localStorageService.removeItem('authToken');
  }

  /**
   * Extracts the user ID from the stored JWT token.
   * @returns The user ID as a number, or null if not available.
   */
  getUserIdFromToken(): number | null {
    const token = this.getToken();
    console.log('Token:', token);
    if (!token) {
      console.error('Token not found');
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);
      return decoded.userId || null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  /**
   * Sends a GET request to the specified endpoint.
   * @param endpoint - The API endpoint.
   * @returns An Observable of the HTTP response.
   */
  get(endpoint: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers });
  }

  /**
   * Sends a POST request to the specified endpoint with the provided data.
   * @param endpoint - The API endpoint.
   * @param data - The data to send.
   * @returns An Observable of the HTTP response.
   */
  post(endpoint: string, data: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  /**
   * Retrieves all tracks from the backend API.
   * @returns An Observable array of track data.
   */
  getTracks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tracks`);
  }

  /**
   * Adds a track to the user's liked tracks.
   * @param userId - The ID of the user.
   * @param trackId - The ID of the track.
   * @returns An Observable of the HTTP response.
   */
  addLikedTrack(userId: number, trackId: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post(`${this.baseUrl}/tracks/like`, { userId, trackId }, { headers });
  }

  /**
   * Removes a track from the user's liked tracks.
   * @param userId - The ID of the user.
   * @param trackId - The ID of the track.
   * @returns An Observable of the HTTP response.
   */
  removeLikedTrack(userId: number, trackId: number): Observable<any> {
    const headers = this.createAuthHeaders();
    console.log('Removing liked track:', { userId, trackId });
    return this.http.post(`${this.baseUrl}/tracks/unlike`, { userId, trackId }, { headers });
  }

  /**
   * Extracts the username from the stored JWT token.
   * @returns The username as a string, or null if not available.
   */
  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);
      return decoded.username || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Retrieves all liked tracks for a specific user.
   * @param userId - The ID of the user.
   * @returns An Observable array of liked track data.
   */
  getLikedTracks(userId: number): Observable<any[]> {
    const headers = this.createAuthHeaders();
    console.log('Making request to fetch liked tracks with headers:', headers);
    return this.http.get<any[]>(`${this.baseUrl}/tracks/${userId}/liked-tracks`, { headers });
  }

  /**
   * Creates HTTP headers with the authentication token.
   * @returns A HttpHeaders object containing the Authorization header.
   */
  private createAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
}
