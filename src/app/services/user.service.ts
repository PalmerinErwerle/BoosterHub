import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { FirestoreBaasService } from './firestore-baas.service';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    spinner = inject(SpinnerComponent);
    toaster = inject(ToasterComponent);
    utilsService = inject(UtilsService);
    firebaseService = inject(FirestoreBaasService);
    angularFire = inject(AngularFirestore);
    usersCollection: AngularFirestoreCollection<User> = this.angularFire.collection<User>('users');

    updateUserRole(user: User, role: string) {
        let path = "users/" + user.uid;
        this.spinner.showSpinner();
  
        user.role = role;
  
        this.firebaseService.updateDocument(path, user).then(async () => {
            this.toaster.successToast("User updated succesfully");
            
            if (role == "denied" || role == "banned") {
                this.utilsService.reload("/home/admin-menu", 2000);
            } else {
                this.utilsService.reload("/home/profile/" + user.uid, 2000);
            }
        }).catch(er => {
            this.toaster.errorToast('Unexpected error while updating the user, please try again');
        }).finally(() => {
            this.spinner.hideSpinner(2000);
        });
    }

    async getUsers() {
        const users: User[] = [];

        const boosters = this.getBoosters();
        (await boosters).forEach((u) => {
            const user = u;
            users.push(user);
        });

        const advisers = this.getAdvisers();
        (await advisers).forEach((u) => {
            const user = u;
            users.push(user);
        });

        const admins = this.getAdmins();
        (await admins).forEach((u) => {
            const user = u;
            users.push(user);
        });

        users.sort((a, b) => a.character_name.localeCompare(b.character_name));

        return users;
    }

    getBoosters() {
        const query = this.usersCollection.ref.where('role', '==', 'booster');
        return query.get().then((querySnapshot) => {
            const users: User[] = [];
        
            querySnapshot.forEach((docSnapshot) => {
              const user = docSnapshot.data();
              users.push(user);
            });
        
            return users;
          });
    }

    getAdvisers() {
        const query = this.usersCollection.ref.where('role', '==', 'adviser');
        return query.get().then((querySnapshot) => {
            const users: User[] = [];
        
            querySnapshot.forEach((docSnapshot) => {
              const user = docSnapshot.data();
              users.push(user);
            });
        
            return users;
          });
    }

    getAdmins() {
        const query = this.usersCollection.ref.where('role', '==', 'admin');
        return query.get().then((querySnapshot) => {
            const users: User[] = [];
        
            querySnapshot.forEach((docSnapshot) => {
              const user = docSnapshot.data();
              users.push(user);
            });
        
            return users;
          });
    }

    getUsersOnHold() {
        const query = this.usersCollection.ref.where('role', '==', 'onHold');
        return query.get().then((querySnapshot) => {
            const users: User[] = [];
        
            querySnapshot.forEach((docSnapshot) => {
              const user = docSnapshot.data();
              users.push(user);
            });
        
            return users;
          });
    }

    getUserByUid(uid: string) {
        const query = this.usersCollection.ref.where('uid', '==', uid);

        return query.get().then(querySnapshot => {
            if (querySnapshot.size === 0) {
                return null;
            }

            const userDoc = querySnapshot.docs[0].data();
            return userDoc;
        });
    }

    getUserByEmail(email: string) {
        const query = this.usersCollection.ref.where('email', '==', email);

        return query.get().then(querySnapshot => {
            if (querySnapshot.size === 0) {
                return null;
            }

            const userDoc = querySnapshot.docs[0].data();
            return userDoc;
        });
    }

    getUserByCharacter(character_name: string, character_realm: string) {
        const query = this.usersCollection.ref
            .where('character_name', '==', character_name)
            .where('character_realm', '==', character_realm);

        return query.get().then(querySnapshot => {
            if (querySnapshot.size === 0) {
                return null;
            }

            const userDoc = querySnapshot.docs[0].data();
            return userDoc;
        });
    }

}