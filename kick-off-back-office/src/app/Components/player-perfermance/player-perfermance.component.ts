import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerPerformance } from 'src/app/models/PlayerPerformance';
import { PlayerPerformanceService } from 'src/app/Services/player-performance-service.service';

@Component({
  selector: 'app-player-perfermance',
  templateUrl: './player-perfermance.component.html',
  styleUrls: ['./player-perfermance.component.css']
})
export class PlayerPerfermanceComponent {


  playerPerformances: PlayerPerformance[] = [];
  deleteSuccessMessage:string='';
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }


  constructor(private playerPerformanceService: PlayerPerformanceService,private router: Router) { }


ngOnInit(): void {
  this.loadPlayerPerformances();
}

loadPlayerPerformances(): void {
  this.playerPerformanceService.getPlayerPerformances().subscribe(
    playerPerformances => {
      // Filtrer les performances archivées
      this.playerPerformances = playerPerformances.filter(performance => !performance.archived);
    },
    error => {
      console.error('Error fetching player performances:', error);
    }
  );
}
  navigateToAddPerformance(): void {
    this.router.navigateByUrl('/PerfermancePlayer/perfermance-create');
  }
  navigateToarchivePerformance(): void {
    this.router.navigateByUrl('/archivePerfermance');
  }
  navigateToPerformanceDetails(id: string): void {
    this.router.navigateByUrl(`/PerfermancePlayer/performance-details/${id}`);
  }
  deletePerformance(id: string): void {
    if (confirm('Are you sure you want to delete this performance?')) {

      this.playerPerformanceService.deletePerformance(id)
        .subscribe(() => {
          this.loadPlayerPerformances();
          this.deleteSuccessMessage = 'Performance deleted successfully!';

        });
    }
  }
  clearDeleteSuccessMessage(): void {
    this.deleteSuccessMessage = '';
  }
  navigateToUpdatePerformance(id: string) {
    this.router.navigate(['/PerfermancePlayer/update-performance', id]);
  }

  archivePerformance(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir archiver cette performance ?')) {
        this.playerPerformanceService.archivePerformance(id).subscribe(
            () => {
                // Recharge la liste des performances après l'archivage
                this.loadPlayerPerformances();
                // Affiche un message de succès
                this.deleteSuccessMessage = "Performance archivée avec succès!";
            },
            (error) => {
                console.log(error);
                // Gérer les erreurs
            }
        );
    }
}

  
}

