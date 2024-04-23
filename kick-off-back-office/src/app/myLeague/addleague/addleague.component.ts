import { Component } from '@angular/core';
import { MyLeague } from '../../models/MyLeague';
import { MyleagueService } from '../../Services/myleague.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-addleague',
  templateUrl: './addleague.component.html',
  styleUrls: ['./addleague.component.css']
})
export class AddleagueComponent {
  newAnalysis: MyLeague= new MyLeague();
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; 
  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(private router: Router, private matchAnalysisService: MyleagueService) { }
  addAnalysis() {
    this.matchAnalysisService.create(this.newAnalysis).subscribe(
      (data) => {
        console.log("New analysis added successfully!");
        this.router.navigate(['/myleague']);

      },
      (error) => {
        console.log("Error adding new analysis:", error);
      }
    );
  }

  

 
}