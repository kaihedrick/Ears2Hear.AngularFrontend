/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear List Tracks Component
 *
 * This component displays all available tracks in the ears2hear application and allows users to like tracks.
 * It interacts with the ApiService to retrieve tracks and the user's liked tracks. The component dynamically updates
 * the UI based on user actions, such as liking a track, and provides feedback messages to the user.
 */

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list-tracks',
  templateUrl: './list-tracks.component.html',
  styleUrls: ['./list-tracks.component.css'],
})
export class ListTracksComponent implements OnInit {
  tracks: any[] = []; // Array to store all tracks
  likedTracksIds: number[] = []; // Array to store IDs of liked tracks
  message: string = ''; // Feedback message to display to the user
  showMessage: boolean = false; // Controls visibility of feedback message
  errorMessage: string = ''; // Error message to display in case of failures

  constructor(private apiService: ApiService) {}

  /**
   * Lifecycle method that initializes the component by fetching all tracks
   * and the list of liked tracks for the current user.
   */
  ngOnInit(): void {
    this.fetchTracks();
    this.fetchLikedTracks();
  }

  /**
   * Fetches all available tracks from the backend and updates the tracks array.
   */
  fetchTracks(): void {
    this.apiService.getTracks().subscribe({
      next: (data) => {
        this.tracks = data;
      },
      error: (err) => {
        console.error('Error fetching tracks:', err);
        this.errorMessage = 'Failed to load tracks.';
      },
    });
  }

  /**
   * Fetches the list of liked tracks for the current user and updates the likedTracksIds array.
   */
  fetchLikedTracks(): void {
    const userId = this.apiService.getUserIdFromToken();
    if (!userId) {
      console.error('User ID not found.');
      return;
    }

    this.apiService.getLikedTracks(userId).subscribe({
      next: (data) => {
        this.likedTracksIds = data.map((track: any) => track.track_id);
      },
      error: (err) => {
        console.error('Error fetching liked tracks:', err);
      },
    });
  }

  /**
   * Handles the liking of a track. If the track is already liked, displays a message.
   * Otherwise, it adds the track to the liked tracks list and updates the UI.
   */
  likeTrack(trackId: number | undefined): void {
    if (!trackId) {
      console.error('Invalid track ID:', trackId);
      this.errorMessage = 'Failed to like track: Invalid track ID.';
      return;
    }

    if (this.likedTracksIds.includes(trackId)) {
      this.displayTemporaryMessage('Track is already liked.');
      return;
    }

    const userId = this.apiService.getUserIdFromToken();
    if (!userId) {
      console.error('User ID not found. Cannot like track.');
      this.errorMessage = 'Failed to like track: User not authenticated.';
      return;
    }

    console.log(`Liking track with ID: ${trackId} for user ID: ${userId}`);
    this.apiService.addLikedTrack(userId, trackId).subscribe({
      next: () => {
        console.log(`Track ${trackId} liked successfully.`);
        this.likedTracksIds.push(trackId); // Update liked tracks list
        this.displayTemporaryMessage('Track liked successfully!');
      },
      error: (err) => {
        console.error('Error liking track:', err);
        this.errorMessage = 'Failed to like the track. Please try again later.';
      },
    });
  }

  /**
   * Displays a temporary feedback message to the user for 2 seconds.
   */
  displayTemporaryMessage(message: string): void {
    this.message = message;
    this.showMessage = true;

    // Hide message after 2 seconds
    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
  }
}
