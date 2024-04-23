import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injury } from '../models/injury.model';

@Injectable({
  providedIn: 'root'
})
export class InjuryService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllInjuries(): Observable<Injury[]> {
    return this.http.get<Injury[]>(`${this.baseUrl}/injuries/allinjuries`);
  }

  deleteInjury(injuryId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/injuries/delete/${injuryId}`);
  }

  archiveInjury(injuryId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/injuries/archive/${injuryId}`, null);
  }

  // Ajouter cette méthode pour récupérer les blessures archivées
  getArchivedInjuries(): Observable<Injury[]> {
    return this.http.get<Injury[]>(`${this.baseUrl}/injuries/archive/archived`);
  }
}
