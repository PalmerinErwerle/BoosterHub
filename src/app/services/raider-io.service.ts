import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RaiderIoCharacter } from '../models/raiderio-character.model';

@Injectable({
  providedIn: 'root'
})
export class RaiderIoService {

  http = inject(HttpClient);

  API_URL = 'https://raider.io/api/v1/characters/profile';

  getCharacter(characterName: string, realm: string, region: string) {
    const url = `${this.API_URL}?region=${region}&realm=${realm}&name=${characterName}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent`;
    return this.http.get<RaiderIoCharacter>(url);
  }

  /* getCharacterData(data: RaiderIoCharacter): {
    character_faction: string;
    character_race: string;
    character_role: string;
    character_class: string;
    character_ilevel: number;
    character_rio: number;
  } {
    return {
      character_faction: data.faction,
      character_race: data.race,
      character_role: data.active_spec_role,
      character_class: data.class,
      character_ilevel: data.gear.item_level_equipped,
      character_rio: data.mythic_plus_scores_by_season[0].scores.all
    };
  } */

}
