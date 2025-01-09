# Ears2Hear Music App - Milestone 4

**Author**: Kai Hedrick  
**Course**: CST-391  
**Instructor**: Instructor Sparks  
**Date**: 11/23/2024  

---

## Overview

Ears2Hear is a Christian music app designed to help users discover and enjoy a variety of Christian music genres. The app integrates a backend Express REST API with a frontend Angular project. For this milestone, authentication through JWT tokens was implemented, enabling secure user authentication and CRUD operations on user portfolios.

---

## Video Links

- [Frontend Presentation](https://vimeo.com/1032896707?share=copy)  
- [PowerPoint Presentation](https://vimeo.com/1032906324?share=copy)  

---

## GitHub Repositories

- [Frontend Repository](https://github.com/kaihedrick/Ears2Hear.Frontend)  
- [Backend Repository](https://github.com/kaihedrick/Ears2Hear.Backend)  

---

## Key Updates (Milestone 4)

| **Update Type**         | **Description**                                                                                           | **Status**     | **Known Issues**                            |
|--------------------------|-----------------------------------------------------------------------------------------------------------|----------------|---------------------------------------------|
| **Project Initialization** | Set up a new Express app and integrated required libraries (TypeScript, MySQL, mysql2, Express).          | Completed      | None                                        |
| **Database Integration** | Configured MySQL database (`ears2hear`) and connected using mysql2/promise.                              | Completed      | None                                        |
| **CRUD Operations**      | Implemented Create, Read, Update, and Delete operations for the tracks entity.                           | Completed      | None                                        |
| **Postman Testing**      | Tested CRUD operations using Postman; documented API endpoints.                                          | Completed      | None                                        |
| **API Design Consistency** | Ensured REST API standards are met for backend structure.                                               | Completed      | Frontend integration in progress            |
| **Error Handling**       | Basic error handling added for CRUD operations.                                                         | Completed      | Improved error messages planned            |

---

## Authentication

JWT-based authentication has been implemented to:
- Secure login using usernames and passwords stored in the database.
- Use middleware to verify user credentials.
- Enable authenticated users to perform CRUD operations such as liking/unliking tracks in their portfolio.

---

## Features and User Stories

### User Stories and Routes

| **User Story**                                                                                 | **Route**                              | **Description**                                                                                       |
|------------------------------------------------------------------------------------------------|----------------------------------------|-------------------------------------------------------------------------------------------------------|
| View all tracks                                                                                | `GET /tracks`                          | Fetches a list of all tracks available in the database.                                               |
| Add a track to a playlist                                                                      | `POST /playlists/:playlist_id/tracks/:track_id` | Adds a specific track to a specific playlist.                                                        |
| Play a specific track                                                                          | `GET /tracks/{trackId}/play`           | Plays a specified track by its ID.                                                                   |
| Manage user favorites                                                                          | `POST /users/:user_id/tracks/:track_id`, `DELETE /users/:user_id/tracks/:track_id` | Adds or removes a track from the user's favorites.                                                   |
| View all playlists                                                                             | `GET /playlists`                       | Fetches all playlists created by the user.                                                           |
| View a playlist by ID                                                                          | `GET /playlists/{id}`                  | Fetches the details of a specific playlist by its ID.                                                |
| Create a new playlist                                                                          | `POST /playlists`                      | Allows users to create a new playlist.                                                              |
| Update a playlist name                                                                         | `PUT /playlists/{id}`                  | Updates the name of an existing playlist.                                                           |
| Delete a playlist                                                                              | `DELETE /playlists/{id}`               | Deletes a playlist by ID.                                                                           |

---

## Risks and Unknowns

- Need for additional database tables or classes for managing artists.
- Risks associated with creating a reliable music player with many variables.
- Uncertainty in UI integration for account management (e.g., navbar).

---

## Postman Documentation

[Updated Postman API Documentation for Milestone 4](https://documenter.getpostman.com/view/36796918/2sAY4xC2bP)

---

## Resources

- [BibleGateway: New International Version](http://www.biblegateway.com/versions/New-International-Version-NIV-Bible/#booklist)

---

## How to Run

1. Clone the repositories:
   ```bash
   git clone https://github.com/kaihedrick/Ears2Hear.Backend.git
   git clone https://github.com/kaihedrick/Ears2Hear.Frontend.git
