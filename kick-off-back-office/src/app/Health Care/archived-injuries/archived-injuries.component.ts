import { Component, OnInit } from '@angular/core';
import { Injury } from 'src/app/models/injuries';
import { InjuriesService } from 'src/app/Services/injuries.service';

@Component({
  selector: 'app-archived-injuries',
  templateUrl: './archived-injuries.component.html',
  styleUrls: ['./archived-injuries.component.css']
})
export class ArchivedInjuriesComponent implements OnInit {
  archivedInjuries: Injury[] = [];
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(private injuriesService: InjuriesService) { }

  ngOnInit(): void {
    this.fetchArchivedInjuries();
  }

  fetchArchivedInjuries(): void {
    this.injuriesService.getArchivedInjuries()
      .subscribe(
        injuries => {
          this.archivedInjuries = injuries;
        },
        error => {
          console.error('Error fetching archived injuries:', error);
        }
      );
  }

  restoreInjury(injuryId: string): void {
    this.injuriesService.restoreInjury(injuryId)
      .subscribe(
        () => {
          // Rafraîchir la liste des blessures archivées après la restauration réussie
          this.fetchArchivedInjuries();
        },
        error => {
          console.error('Error restoring injury:', error);
        }
      );
  }
}