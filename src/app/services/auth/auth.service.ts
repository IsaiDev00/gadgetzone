import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://gadgetzone-api-534526154363.us-central1.run.app/users';

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  register(email: string, password: string, name: string, role: string = 'user'): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential) => {
        const firebaseU = userCredential.user?.uid;
        if (!firebaseU) {
          throw new Error('Error al obtener el UID de Firebase.');
        }
        return this.http.post(this.apiUrl, { firebaseUserId: firebaseU, name, email, role });
      }),
      catchError((error) => {
        console.error('Error en el registro híbrido:', error);
        throw error;
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  resetPassword(email: string): Observable<void> {
    return from(this.afAuth.sendPasswordResetEmail(email));
  }
}
