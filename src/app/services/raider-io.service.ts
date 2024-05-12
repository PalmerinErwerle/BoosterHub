import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RaiderIoCharacter } from '../models/raiderio-character.model';

@Injectable({
  providedIn: 'root'
})
export class RaiderIoService {

  http = inject(HttpClient);

  API_URL = 'https://raider.io/api/v1/characters/profile';

  getCharacter(characterName: string | null | undefined, realm: string | null | undefined, region: string): Observable<RaiderIoCharacter> {
    const url = `${this.API_URL}?region=${region}&realm=${realm}&name=${characterName}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent`;
    return this.http.get<RaiderIoCharacter>(url);
  }

}
