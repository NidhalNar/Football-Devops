import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent {
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(private router: Router) { }

  navigateToInjuries() {
    this.router.navigate(['/injuries']);
  }

  navigateToRecoveries() {
    this.router.navigate(['/recoveries']);
  }

  navigateToPreventions() {
    this.router.navigate(['/preventions']);
  }

  navigateToArchivedInjuries() {
    this.router.navigate(['/archivedinjuries']);
  }

  navigateToArchivedRecoveries() {
    this.router.navigate(['/archivedrecoveries']);
  }

  navigateToArchivedPreventions() {
    this.router.navigate(['/archivedpreventions']);
  }
}
