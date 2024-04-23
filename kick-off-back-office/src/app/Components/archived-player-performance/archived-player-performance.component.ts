import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerPerformance } from 'src/app/models/PlayerPerformance';
import { PlayerPerformanceService } from 'src/app/Services/player-performance-service.service';

@Component({
  selector: 'app-archived-player-performance',
  templateUrl: './archived-player-performance.component.html',
  styleUrls: ['./archived-player-performance.component.css']
})
export class ArchivedPlayerPerformanceComponent implements OnInit {
  archivedPlayerPerformances: PlayerPerformance[] = [];
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }
  constructor(private playerPerformanceService: PlayerPerformanceService,private router :Router) { }

  ngOnInit(): void {
    this.loadArchivedPlayerPerformances();
  }

  loadArchivedPlayerPerformances(): void {
    this.playerPerformanceService.getPlayerPerformances().subscribe(
      playerPerformances => {
        // Filtrer les performances archivées
        this.archivedPlayerPerformances = playerPerformances.filter(performance => performance.archived);
      },
      error => {
        console.error('Error fetching archived player performances:', error);
      }
    );
  }

  retourFunction() {
    console.log("Bouton Retour cliqué !");
    this.router.navigate(['/perfermance']);

  }

}
