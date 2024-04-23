import { Component, OnInit } from '@angular/core';
import { Prevention } from 'src/app/models/preventions';
import { PreventionsService } from 'src/app/Services/preventions.service';

@Component({
  selector: 'app-prevention',
  templateUrl: './prevention.component.html',
  styleUrls: ['./prevention.component.css']
})
export class PreventionComponent implements OnInit {

  preventions: Prevention[] = [];
  archivedPreventions: Prevention[] = [];
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(private preventionsService: PreventionsService) { }

  ngOnInit(): void {
    this.fetchPreventions();

  }

  fetchPreventions(): void {
    this.preventionsService.getAllPreventions()
      .subscribe(
        (preventions: Prevention[]) => {
          this.preventions = preventions.filter(prevention => !prevention.archived);
          this.archivedPreventions = preventions.filter(prevention => prevention.archived);
        },
        (error) => {
          console.error('Error fetching preventions:', error);
        }
      );
  }

  deletePrevention(preventionId: string): void {
    this.preventionsService.deletePrevention(preventionId)
      .subscribe(
        () => {
          console.log('Prevention deleted successfully');
          this.fetchPreventions();
        },
        (error) => {
          console.error('Error deleting prevention:', error);
        }
      );
  }

  archivePrevention(preventionId: string): void {
    this.preventionsService.archivePrevention(preventionId)
      .subscribe(
        () => {
          console.log('Prevention archived successfully');
          this.fetchPreventions();
          // Naviguer vers le composant ArchivedPreventionComponent
          //this.router.navigate(['/ArchivedPrevention']);
        },
        (error) => console.error('Error archiving prevention:', error)
      );
  }
}
