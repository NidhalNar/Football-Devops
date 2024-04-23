import { Component, OnInit } from '@angular/core';
import { RecoveryPlan } from 'src/app/models/recoveries';
import { RecoveriesService } from 'src/app/Services/recoveries.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  recoveryPlans: RecoveryPlan[] = [];
  archivedRecoveryPlans: RecoveryPlan[] = [];
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(private recoveriesService: RecoveriesService) { }

  ngOnInit(): void {
    this.fetchRecoveryPlans();
  }

  fetchRecoveryPlans(): void {
    this.recoveriesService.getAllRecoveryPlans()
      .subscribe(
        recoveryPlans => {
          this.recoveryPlans = recoveryPlans.filter(plan => !plan.archived);
        },
        error => {
          console.error('Error fetching recovery plans:', error);
        }
      );
  }

  deleteRecoveryPlan(recoveryPlanId: string): void {
    this.recoveriesService.deleteRecoveryPlan(recoveryPlanId)
      .subscribe(
        () => {
          console.log('Recovery Plan deleted successfully');
          this.fetchRecoveryPlans();
          this.fetchArchivedRecoveryPlans();
        },
        (error) => console.error('Error deleting recovery plan:', error)
      );
  }

  archiveRecoveryPlan(recoveryPlanId: string): void {
    this.recoveriesService.archiveRecoveryPlan(recoveryPlanId)
      .subscribe(
        () => {
          console.log('Recovery Plan archived successfully');
          this.fetchRecoveryPlans();
          this.fetchArchivedRecoveryPlans();
          // Naviguer vers le composant ArchivedRecoveryComponent
          //this.router.navigate(['/ArchivedRecovery']);
        },
        (error) => console.error('Error archiving recovery plan:', error)
      );
  }
  fetchArchivedRecoveryPlans(): void {
    this.recoveriesService.getAllRecoveryPlans()
        .subscribe(
            recoveryPlans => {
                this.archivedRecoveryPlans = recoveryPlans.filter(plan => plan.archived);
            },
            error => {
                console.error('Error fetching archived recovery plans:', error);
            }
        );
}


}
