import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }


  logout(): void {
    this.authService.performLogout().subscribe(
      () => {
        console.log('Logout successful');
        // Redirect the user to the login page after successful logout
        this.router.navigate(['/user/login']); // Adjusted path for lazy loading
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }
  fetchUserDetails(): void {
    this.authService.getUserDetails().subscribe(
      (response) => {
        this.userDetails = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
