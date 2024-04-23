import { Component } from '@angular/core';
import { MyLeague } from '../../models/MyLeague';
import { MyleagueService } from '../../Services/myleague.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifyleague',
  templateUrl: './modifyleague.component.html',
  styleUrls: ['./modifyleague.component.css']
})
export class ModifyleagueComponent {
  analysisId!: string;
  analysisDetails: MyLeague = new MyLeague();
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analysisService: MyleagueService
  ) { }


  ngOnInit(): void {
    this.analysisId = this.route.snapshot.params['id']; 

    this.analysisService.getById(this.analysisId).subscribe(
      (data) => {
        this.analysisDetails = data;
      },
      (error) => {
        console.log("Error fetching analysis details:", error);
      }
    );
  }
  updateAnalysis() {
    this.analysisService.update(this.analysisId, this.analysisDetails).subscribe(
      (data) => {
        console.log("Analysis updated successfully!");
       
        this.router.navigate(['/myleague']);

      },
      (error) => {
        console.log("Error updating analysis:", error);
      }
    );
  }
  
}

