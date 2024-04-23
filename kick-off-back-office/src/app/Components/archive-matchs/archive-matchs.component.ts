import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatchAnalysis } from 'src/app/models/Match Analysis';
import { MatchAnalysisService } from 'src/app/Services/match-analysis.service';

@Component({
  selector: 'app-archive-matchs',
  templateUrl: './archive-matchs.component.html',
  styleUrls: ['./archive-matchs.component.css']
})
export class ArchiveMatchsComponent {
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image
  matchAnalyses: MatchAnalysis[]= [];
  successAlert: boolean = false;
  deleteSuccessMessage:string='';
  

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  
  constructor(private matchAnalysisService: MatchAnalysisService,private router: Router) { }

  ngOnInit(): void {
    this.loadMatchAnalyses();
  }

  loadMatchAnalyses(): void {
    this.matchAnalysisService.getAll()
      .subscribe(
        matchAnalyses => {
          // Filtrer les analyses de match archivées
          this.matchAnalyses = matchAnalyses.filter(analysis => analysis.archived);
        },
        error => {
          console.error('Erreur lors du chargement des analyses de match :', error);
        }
      );
}

  clearDeleteSuccessMessage(): void {
    this.deleteSuccessMessage = '';
  }

  retourFunction() {
    console.log("Bouton Retour cliqué !");
    this.router.navigate(['/matchAnalysis']);

  }
}
