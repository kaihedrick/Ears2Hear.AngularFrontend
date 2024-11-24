/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 hear Local Storage Service
 *
 * This service provides utility methods for interacting with the browser's local storage.
 * It abstracts local storage operations, ensuring consistency and reducing repetitive code.
 * The service supports storing, retrieving, and removing key-value pairs in local storage.
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Retrieves an item from local storage by its key.
   *
   * @param key - The key associated with the item to retrieve.
   * @returns The value stored in local storage for the specified key, or `null` if not found.
   */
  getItem(key: string): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null; // Return null if local storage is not accessible
  }

  /**
   * Stores an item in local storage with the specified key and value.
   *
   * @param key - The key under which the value will be stored.
   * @param value - The value to store in local storage.
   */
  setItem(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Removes an item from local storage by its key.
   *
   * @param key - The key of the item to remove.
   */
  removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
