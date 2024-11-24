import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { ApiService } from '../services/api.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController; // Mocking HTTP requests
  let httpClient: HttpClient; // To make HTTP calls

  beforeEach(() => {
    // Configure the testing module with necessary imports and providers
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Module to mock HTTPClient
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Add the AuthInterceptor to the interceptor chain
        ApiService, // Provide ApiService for dependency injection
      ],
    });

    // Inject the mock HTTP controller and HTTP client for use in tests
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should add an Authorization header', () => {
    // Arrange: Set up mock token and spy on the ApiService's getToken method
    const mockToken = 'mock-token';
    const apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getToken').and.returnValue(mockToken); // Mock the token returned by ApiService

    // Act: Make a test HTTP GET request
    httpClient.get('/test').subscribe();

    // Assert: Verify the outgoing HTTP request
    const httpRequest = httpMock.expectOne('/test');

    // Check if the Authorization header is present and has the correct value
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

    // Verify that no unexpected requests are outstanding
    httpMock.verify();
  });

  afterEach(() => {
    // Ensure no unexpected HTTP requests remain outstanding after each test
    httpMock.verify();
  });
});
