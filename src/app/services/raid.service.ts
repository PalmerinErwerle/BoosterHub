import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { FormGroup } from '@angular/forms';
import { FirestoreBaasService } from './firestore-baas.service';
import { Raid } from '../models/raid.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class RaidService {

  spinner = inject(SpinnerComponent);
  toaster = inject(ToasterComponent);
  utilsService = inject(UtilsService);
  firebaseService = inject(FirestoreBaasService);
  angularFire = inject(AngularFirestore);

  raidsCollection: AngularFirestoreCollection<Raid> = this.angularFire.collection<Raid>('raids');

  createRaid(form: FormGroup) {
      let path = "raids";
      this.spinner.showSpinner();

      this.firebaseService.postDocument(path, form.value).then(async res => {
          form.controls['id'].setValue(res.id);
          this.firebaseService.updateDocument((path + "/" + res.id), form.value);

          this.toaster.successToast("Raid service created succesfully");
          this.utilsService.reload("/home/raid/" + res.id, 2000);
      }).catch(er => {
          this.toaster.errorToast('Unexpected error while creating the service, please try again');
      }).finally(() => {
          this.spinner.hideSpinner(2000);
      });
  }

  updateRaid(form: FormGroup, id: string) {
      let path = "raids/" + id;
      this.spinner.showSpinner();

      this.firebaseService.updateDocument(path, form.value).then(async () => {
          this.toaster.successToast("Raid service updated succesfully");
          this.utilsService.reload("/home/raid/" + id, 2000);
      }).catch(er => {
          this.toaster.errorToast('Unexpected error while updating the service, please try again');
      }).finally(() => {
          this.spinner.hideSpinner(2000);
      });
  }

  getRaids(): Promise<Raid[]> {
    const query = this.raidsCollection.ref;

    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByAdviser(adviser_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('adviser_id', '==', adviser_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  async getRaidsByBooster(booster_id: string) {
      const raids: Raid[] = [];

      const raidsTank1 = this.getRaidsByTank1(booster_id);
      (await raidsTank1).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      const raidsTank2 = this.getRaidsByTank2(booster_id);
      (await raidsTank2).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      const raidsHealer1 = this.getRaidsByHealer1(booster_id);
      (await raidsHealer1).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      const raidsHealer2 = this.getRaidsByHealer2(booster_id);
      (await raidsHealer2).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      const raidsDps1 = this.getRaidsByDps1(booster_id);
      (await raidsDps1).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      const raidsDps2 = this.getRaidsByDps2(booster_id);
      (await raidsDps2).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      const raidsDps3 = this.getRaidsByDps3(booster_id);
      (await raidsDps3).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      const raidsDps4 = this.getRaidsByDps4(booster_id);
      (await raidsDps4).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      const raidsDps5 = this.getRaidsByDps5(booster_id);
      (await raidsDps5).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      const raidsDps6 = this.getRaidsByDps6(booster_id);
      (await raidsDps6).forEach((r) => {
          const raid = r;
          raids.push(raid);
      });

      return raids;
  }

  getRaidsByTank1(tank1_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('tank1_id', '==', tank1_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByTank2(tank2_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('tank2_id', '==', tank2_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByHealer1(healer1_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('healer1_id', '==', healer1_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByHealer2(healer2_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('healer2_id', '==', healer2_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByDps1(dps1_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('dps1_id', '==', dps1_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByDps2(dps2_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('dps2_id', '==', dps2_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByDps3(dps3_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('dps3_id', '==', dps3_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByDps4(dps4_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('dps4_id', '==', dps4_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByDps5(dps5_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('dps5_id', '==', dps5_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidsByDps6(dps6_id: string): Promise<Raid[]> {
    const query = this.raidsCollection.ref.where('dps6_id', '==', dps6_id);
    return query.get().then((querySnapshot) => {
        const raids: Raid[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const raid = docSnapshot.data();
            raids.push(raid);
        });

        return raids;
    });
  }

  getRaidById(id: string) {
    const query = this.raidsCollection.ref.where('id', '==', id);

    return query.get().then(querySnapshot => {
        if (querySnapshot.size === 0) {
            return null;
        }

        const userDoc = querySnapshot.docs[0].data();
        return userDoc;
    });
}

}
