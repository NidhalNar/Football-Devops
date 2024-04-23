import { Component, OnInit } from '@angular/core';
import { MyLeague } from '../../models/MyLeague';
import { MyleagueService } from '../../Services/myleague.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-archievedmatched',
  templateUrl: './archievedmatched.component.html',
  styleUrls: ['./archievedmatched.component.css']
})
export class ArchievedmatchedComponent {
  myLeagues: MyLeague[] = [];
  filteredLeagues: MyLeague[] = []; 
  currentPage: number = 1; 
  itemsPerPage: number = 9; 
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }
  

  constructor(private myLeagueService: MyleagueService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMyLeagues();
    this.filterByMatchStatus(null); // Show all leagues by default

  }

  getAllMyLeagues(): void {
    this.myLeagueService.getAll().subscribe(
      myLeagues => {
        this.myLeagues = myLeagues;
        this.filterByMatchStatus(null); // Set default to show scheduled matches

        console.log(myLeagues); // Optional: Log the retrieved data
      },
      error => {
        console.error('Error retrieving MyLeagues:', error);
        // Handle error as needed
      }
    );
  }

  
  filterByMatchStatus(status: string | null): void {
    if (status === null) {
        this.filteredLeagues = [...this.myLeagues]; // Show all leagues
    } else if (status === 'scheduled' || status === 'canceled' || status === 'completed') {
        this.filteredLeagues = this.myLeagues.filter(league => league.matchStatus === status);
    } else {
        this.filteredLeagues = [...this.myLeagues]; // If invalid status, show all leagues
    }
}




}
