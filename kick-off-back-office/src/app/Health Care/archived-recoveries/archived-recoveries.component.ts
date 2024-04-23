import { Component, OnInit } from '@angular/core';
import { RecoveryPlan } from 'src/app/models/recoveries';
import { RecoveriesService } from 'src/app/Services/recoveries.service';

@Component({
  selector: 'app-archived-recoveries',
  templateUrl: './archived-recoveries.component.html',
  styleUrls: ['./archived-recoveries.component.css']
})
export class ArchivedRecoveriesComponent implements OnInit {
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
    this.fetchArchivedRecoveryPlans();
  }

  fetchArchivedRecoveryPlans(): void {
    this.recoveriesService.getArchivedRecoveryPlans()
      .subscribe(
        archivedRecoveryPlans => {
          this.archivedRecoveryPlans = archivedRecoveryPlans;
        },
        error => {
          console.error('Error fetching archived recovery plans:', error);
        }
      );
  }

  restoreRecoveryPlan(recoveryPlanId: string): void {
    this.recoveriesService.restoreRecoveryPlan(recoveryPlanId)
      .subscribe(
        () => {
          // Réussite de la restauration, actualisez la liste des plans archivés
          this.fetchArchivedRecoveryPlans();
        },
        error => {
          console.error('Error restoring recovery plan:', error);
        }
      );
  }
}
