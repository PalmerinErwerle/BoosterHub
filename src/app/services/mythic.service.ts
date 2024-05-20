import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { FormGroup } from '@angular/forms';
import { FirestoreBaasService } from './firestore-baas.service';
import { Mythic } from '../models/mythic.model';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class MythicService {

    spinner = inject(SpinnerComponent);
    toaster = inject(ToasterComponent);
    utilsService = inject(UtilsService);
    firebaseService = inject(FirestoreBaasService);
    angularFire = inject(AngularFirestore);

    mythicsCollection: AngularFirestoreCollection<Mythic> = this.angularFire.collection<Mythic>('mythics');

    createMythic(form: FormGroup) {
        let path = "mythics";
        this.spinner.showSpinner();

        this.firebaseService.postDocument(path, form.value).then(async res => {
            form.controls['id'].setValue(res.id);
            this.firebaseService.updateDocument((path + "/" + res.id), form.value);

            this.toaster.successToast("Mythic+ service created succesfully");
            this.utilsService.reload("/home/mythic/" + res.id, 2000);
        }).catch(er => {
            this.toaster.errorToast('Unexpected error while creating the service, please try again');
        }).finally(() => {
            this.spinner.hideSpinner(2000);
        });
    }

    updateMythic(form: FormGroup, id: string) {
        let path = "mythics/" + id;
        this.spinner.showSpinner();

        this.firebaseService.updateDocument(path, form.value).then(async () => {
            this.toaster.successToast("Mythic+ service updated succesfully");
        }).catch(er => {
            this.toaster.errorToast('Unexpected error while updating the service, please try again');
        }).finally(() => {
            this.spinner.hideSpinner(2000);
        });
    }

    getMythics(): Promise<Mythic[]> {
        const query = this.mythicsCollection.ref;

        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

    getMythicsByAdviser(adviser_id: string): Promise<Mythic[]> {
        const query = this.mythicsCollection.ref.where('adviser_id', '==', adviser_id);
        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

    async getMythicsByBooster(booster_id: string) {
        const mythics: Mythic[] = [];

        const mythicsTank = this.getMythicsByTank(booster_id);
        (await mythicsTank).forEach((m) => {
            const mythic = m;
            mythics.push(mythic);
        });

        const mythicsHealer = this.getMythicsByHealer(booster_id);
        (await mythicsHealer).forEach((m) => {
            const mythic = m;
            mythics.push(mythic);
        });

        const mythicsDps1 = this.getMythicsByDps1(booster_id);
        (await mythicsDps1).forEach((m) => {
            const mythic = m;
            mythics.push(mythic);
        });

        const mythicsDps2 = this.getMythicsByDps2(booster_id);
        (await mythicsDps2).forEach((m) => {
            const mythic = m;
            mythics.push(mythic);
        });

        return mythics;
    }

    getMythicsByTank(tank_id: string): Promise<Mythic[]> {
        const query = this.mythicsCollection.ref.where('tank_id', '==', tank_id);

        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

    getMythicsByHealer(healer_id: string): Promise<Mythic[]> {
        const query = this.mythicsCollection.ref.where('healer_id', '==', healer_id);

        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

    getMythicsByDps1(dps1_id: string): Promise<Mythic[]> {
        const query = this.mythicsCollection.ref.where('dps1_id', '==', dps1_id);

        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

    getMythicsByDps2(dps2_id: string): Promise<Mythic[]> {
        const query = this.mythicsCollection.ref.where('dps2_id', '==', dps2_id);

        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

    getMythicById(id: string) {
        const query = this.mythicsCollection.ref.where('id', '==', id);

        return query.get().then(querySnapshot => {
            if (querySnapshot.size === 0) {
                return null;
            }

            const userDoc = querySnapshot.docs[0].data();
            return userDoc;
        });
    }

}