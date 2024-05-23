import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { FormGroup } from '@angular/forms';
import { FirestoreBaasService } from './firestore-baas.service';
import { Strike } from '../models/strike.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class StrikeService {

  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);
  utilsService = inject(UtilsService);
  firebaseService = inject(FirestoreBaasService);
  angularFire = inject(AngularFirestore);

  strikesCollection: AngularFirestoreCollection<Strike> = this.angularFire.collection<Strike>('strikes');

  createStrike(form: FormGroup) {
      let path = "strikes";
      this.spinner.showSpinner();

      this.firebaseService.postDocument(path, form.value).then(async res => {
          form.controls['id'].setValue(res.id);
          this.firebaseService.updateDocument((path + "/" + res.id), form.value);

          this.toaster.successToast("Strike created succesfully");
          this.utilsService.reload("/home/strike/" + res.id, 2000);
      }).catch(er => {
          this.toaster.errorToast('Unexpected error while creating the strike, please try again');
      }).finally(() => {
          this.spinner.hideSpinner(2000);
      });
  }

  updateStrike(form: FormGroup, id: string) {
      let path = "strikes/" + id;
      this.spinner.showSpinner();

      this.firebaseService.updateDocument(path, form.value).then(async () => {
          this.toaster.successToast("Strike updated succesfully");
          this.utilsService.reload("/home/strike/" + id, 2000);
      }).catch(er => {
          this.toaster.errorToast('Unexpected error while updating the strike, please try again');
      }).finally(() => {
          this.spinner.hideSpinner(2000);
      });
  }

  updateStrikeStatus(strike: Strike, id: string, newStatus: string) {
      let path = "strikes/" + id;
      this.spinner.showSpinner();

      strike.status = newStatus;

      this.firebaseService.updateDocument(path, strike).then(async () => {
          this.toaster.successToast("Strike checked as paid succesfully");
          this.utilsService.reload("/home/strike/" + id, 2000);
      }).catch(er => {
          this.toaster.errorToast('Unexpected error while updating the strike, please try again');
      }).finally(() => {
          this.spinner.hideSpinner(2000);
      });
  }

  getStrikes(): Promise<Strike[]> {
    const query = this.strikesCollection.ref;

    return query.get().then((querySnapshot) => {
        const strikes: Strike[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const strike = docSnapshot.data();
            strikes.push(strike);
        });

        return strikes;
    });
  }

  getStrikesByStriked(striked_id: string): Promise<Strike[]> {
    const query = this.strikesCollection.ref.where('striked_id', '==', striked_id);
    return query.get().then((querySnapshot) => {
        const strikes: Strike[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const strike = docSnapshot.data();
            strikes.push(strike);
        });

        return strikes;
    });
  }

  getStrikeById(id: string) {
    const query = this.strikesCollection.ref.where('id', '==', id);

    return query.get().then(querySnapshot => {
        if (querySnapshot.size === 0) {
            return null;
        }

        const userDoc = querySnapshot.docs[0].data();
        return userDoc;
    });
  }

}
