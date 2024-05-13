import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    angularFire = inject(AngularFirestore);
    usersCollection: AngularFirestoreCollection<User> = this.angularFire.collection<User>('users');

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

}