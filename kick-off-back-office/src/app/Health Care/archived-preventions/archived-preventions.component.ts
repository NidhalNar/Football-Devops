import { Component, OnInit } from '@angular/core';
import { Prevention } from 'src/app/models/preventions';
import { PreventionsService } from 'src/app/Services/preventions.service';

@Component({
  selector: 'app-archived-preventions',
  templateUrl: './archived-preventions.component.html',
  styleUrls: ['./archived-preventions.component.css']
})
export class ArchivedPreventionsComponent implements OnInit {
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
    this.fetchArchivedPreventions();
  }

  fetchArchivedPreventions(): void {
    this.preventionsService.getArchivedPreventions()
      .subscribe(
        archivedPreventions => {
          this.archivedPreventions = archivedPreventions;
        },
        error => {
          console.error('Error fetching archived preventions:', error);
        }
      );
  }

  toggleDetails(prevention: Prevention): void {
    prevention.showDetails = !prevention.showDetails;
}

restorePrevention(preventionId: string): void {
  this.preventionsService.restorePrevention(preventionId)
    .subscribe(
      () => {
        // Rafraîchir la liste des préventions archivées après la restauration réussie
        this.fetchArchivedPreventions();
      },
      error => {
        console.error('Error restoring prevention:', error);
      }
    );
}
}
