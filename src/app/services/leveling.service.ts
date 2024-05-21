import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { FormGroup } from '@angular/forms';
import { FirestoreBaasService } from './firestore-baas.service';
import { Leveling } from '../models/leveling.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class LevelingService {

  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);
  utilsService = inject(UtilsService);
  firebaseService = inject(FirestoreBaasService);
  angularFire = inject(AngularFirestore);

  levelingsCollection: AngularFirestoreCollection<Leveling> = this.angularFire.collection<Leveling>('leveling');

  createLeveling(form: FormGroup) {
      let path = "levelings";
      this.spinner.showSpinner();

      this.firebaseService.postDocument(path, form.value).then(async res => {
          form.controls['id'].setValue(res.id);
          this.firebaseService.updateDocument((path + "/" + res.id), form.value);

          this.toaster.successToast("Leveling service created succesfully");
          this.utilsService.reload("/home/leveling/" + res.id, 2000);
      }).catch(er => {
          this.toaster.errorToast('Unexpected error while creating the service, please try again');
      }).finally(() => {
          this.spinner.hideSpinner(2000);
      });
  }

  updateLeveling(form: FormGroup, id: string) {
      let path = "levelings/" + id;
      this.spinner.showSpinner();

      this.firebaseService.updateDocument(path, form.value).then(async () => {
          this.toaster.successToast("Leveling service updated succesfully");
          this.utilsService.reload("/home/leveling/" + id, 2000);
      }).catch(er => {
          this.toaster.errorToast('Unexpected error while updating the service, please try again');
      }).finally(() => {
          this.spinner.hideSpinner(2000);
      });
  }

  getLevelings(): Promise<Leveling[]> {
      const query = this.levelingsCollection.ref;

      return query.get().then((querySnapshot) => {
          const levelings: Leveling[] = [];

          querySnapshot.forEach((docSnapshot) => {
              const leveling = docSnapshot.data();
              levelings.push(leveling);
          });

          return levelings;
      });
  }

  getLevelingsByAdviser(adviser_id: string): Promise<Leveling[]> {
      const query = this.levelingsCollection.ref.where('adviser_id', '==', adviser_id);
      return query.get().then((querySnapshot) => {
          const levelings: Leveling[] = [];

          querySnapshot.forEach((docSnapshot) => {
              const leveling = docSnapshot.data();
              levelings.push(leveling);
          });

          return levelings;
      });
  }

  getLevelingsByBooster(booster_id: string): Promise<Leveling[]> {
      const query = this.levelingsCollection.ref.where('booster_id', '==', booster_id);

      return query.get().then((querySnapshot) => {
          const levelings: Leveling[] = [];

          querySnapshot.forEach((docSnapshot) => {
              const leveling = docSnapshot.data();
              levelings.push(leveling);
          });

          return levelings;
      });
  }

  getLevelingById(id: string) {
      const query = this.levelingsCollection.ref.where('id', '==', id);

      return query.get().then(querySnapshot => {
          if (querySnapshot.size === 0) {
              return null;
          }

          const userDoc = querySnapshot.docs[0].data();
          return userDoc;
      });
  }

}
