import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { FormGroup } from '@angular/forms';
import { FirestoreBaasService } from './firestore-baas.service';
import { Mythic } from '../models/mythic.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    spinner = inject(SpinnerComponent);
    toaster = inject(ToasterComponent);
    firebaseService = inject(FirestoreBaasService);
    angularFire = inject(AngularFirestore);

    usersCollection: AngularFirestoreCollection<Mythic> = this.angularFire.collection<Mythic>('mythics');

    createMythic(form: FormGroup) {
        let path = "mythics";
        this.spinner.showSpinner();

        this.firebaseService.postDocument(path, form.value).then(async res => {
            form.controls['id'].setValue(res.id);
            this.firebaseService.updateDocument((path + "/" + res.id), form.value);

            this.toaster.successToast("Mythic+ service created succesfully");
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
        const query = this.usersCollection.ref;

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
        const query = this.usersCollection.ref.where('adviser_id', '==', adviser_id);
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

    getMythicsByTank(booster_id: string): Promise<Mythic[]> {
        const query = this.usersCollection.ref.where('tank_id', '==', booster_id);

        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

    getMythicsByHealer(booster_id: string): Promise<Mythic[]> {
        const query = this.usersCollection.ref.where('healer_id', '==', booster_id);

        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

    getMythicsByDps1(booster_id: string): Promise<Mythic[]> {
        const query = this.usersCollection.ref.where('dps1_id', '==', booster_id);

        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

    getMythicsByDps2(booster_id: string): Promise<Mythic[]> {
        const query = this.usersCollection.ref.where('dps2_id', '==', booster_id);

        return query.get().then((querySnapshot) => {
            const mythics: Mythic[] = [];

            querySnapshot.forEach((docSnapshot) => {
                const mythic = docSnapshot.data();
                mythics.push(mythic);
            });

            return mythics;
        });
    }

}