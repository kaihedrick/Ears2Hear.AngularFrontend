import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void { //will be used in the html to make sure user is authenticated before taking to home page, if a user doesn't authenticate first, it will say guest on screen
    this.username = this.apiService.getUsernameFromToken();
  }
}
