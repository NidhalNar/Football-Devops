import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/User.Model';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: any;
  notificationMessage: string = ''; 
  profileImage: File | null = null; // Variable to store the selected profile image file
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchAdminDetails();
  }

  fetchAdminDetails(): void {
    this.authService.getAdminDetails().subscribe(
      (data: User) => {
        this.userDetails = data;
      },
      error => {
        console.error('Error fetching admin details:', error);
        // Handle error
      }
    );
  }

  // Method to handle file input change event
  onFileChange(event: any): void {
    this.profileImage = event.target.files[0];
  }

  updateUser(): void {
    const id = this.userDetails._id;
    const newData = { ...this.userDetails };
  
    // FormData to send both user details and profile image
    const formData = new FormData();
    formData.append('firstName', newData.firstName); 
    formData.append('lastName', newData.lastName);
    formData.append('email', newData.email);
    formData.append('age', newData.age);
    formData.append('contact', newData.contact);
    formData.append('systemConfigurationSettings', newData.systemConfigurationSettings);
    formData.append('dataManagementResponsibilities', newData.dataManagementResponsibilities);
    formData.append('userManagementRights', newData.userManagementRights);
    formData.append('systemAccessPermissions', newData.systemAccessPermissions);

    if (this.profileImage) {
      formData.append('profileImage', this.profileImage); 
    }
  
    this.userService.updateUser(id, formData).subscribe(
      (updatedUser: User) => {
        console.log('User details updated successfully:', updatedUser);
        this.userDetails = updatedUser;
        this.notificationMessage = 'Your account has been updated successfully'; 
        setTimeout(() => {
          this.notificationMessage = '';
        }, 3000);
      },
      error => {
        console.error('Error updating user details:', error);
        // Handle error
      }
    );
  }
  
  logout(): void {
    this.authService.performLogout().subscribe(
      () => {
        console.log('Logout successful');
        // Redirect the user to the login page after successful logout
        window.location.href = 'http://localhost:4200/user/login'; // Assuming the other project is running on port 4201
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }
}
