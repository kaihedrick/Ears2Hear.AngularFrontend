/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear API Service Unit Tests
 *
 * This file contains unit tests for the ApiService. It verifies the initialization and basic functionality
 * of the service within the Angular testing environment.
 */

import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    // Configure the testing module and inject the ApiService instance
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    // Verify that the ApiService instance is successfully created
    expect(service).toBeTruthy();
  });
});
