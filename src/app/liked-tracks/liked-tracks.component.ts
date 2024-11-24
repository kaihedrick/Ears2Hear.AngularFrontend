/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 hear Liked Tracks Component
 *
 * This component manages the user's liked tracks within the ears2hear application.
 * It interacts with the ApiService to retrieve, display, and remove liked tracks.
 * The component handles user interactions for unliking tracks and dynamically updates
 * the displayed list without refreshing the entire page.
 */

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liked-tracks',
  templateUrl: './liked-tracks.component.html',
  styleUrls: ['./liked-tracks.component.css'],
})
export class LikedTracksComponent implements OnInit {
  likedTracks: any[] = []; // Array to store liked tracks
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  /**
   * Lifecycle method that runs when the component initializes.
   * Retrieves the user ID from the token and fetches the user's liked tracks.
   */
  ngOnInit(): void {
    const userId = this.apiService.getUserIdFromToken();
    console.log('User ID from token:', userId);

    if (userId) {
      this.fetchLikedTracks(userId);
    } else {
      console.error('User ID could not be retrieved from token.');
    }
  }

  /**
   * Fetches the liked tracks for the specified user ID and updates the component state.
   */
  fetchLikedTracks(userId: number): void {
    this.apiService.getLikedTracks(userId).subscribe({
      next: (data) => {
        this.likedTracks = data;
      },
      error: (err) => {
        console.error('Error fetching liked tracks:', err);
        this.errorMessage = 'Failed to fetch liked tracks. Please try again later.';
      },
    });
  }

  /**
   * Unlikes a track for the current user and removes it from the displayed list.
   */
  unlikeTrack(trackId: number | undefined): void {
    if (!trackId) {
      console.error('Invalid track ID:', trackId); // Debugging log
      this.errorMessage = 'Failed to unlike track: Invalid track ID.';
      return;
    }

    const userId = this.apiService.getUserIdFromToken();
    if (!userId) {
      console.warn('No valid token found. Cannot unlike track.');
      this.errorMessage = 'Failed to unlike track: User not authenticated.';
      return;
    }

    console.log(`Attempting to unlike track with ID: ${trackId} for user ID: ${userId}`);
    this.apiService.removeLikedTrack(userId, trackId).subscribe({
      next: () => {
        console.log(`Track with ID: ${trackId} successfully unliked.`);
        // Remove the track from the list without refreshing
        this.likedTracks = this.likedTracks.filter((track) => track.track_id !== trackId);
      },
      error: (err) => {
        console.error('Error unliking track:', err);
        this.errorMessage = 'Failed to unlike the track. Please try again later.';
      },
    });
  }
}
