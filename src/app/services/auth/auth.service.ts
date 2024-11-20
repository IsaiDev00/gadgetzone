import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://gadgetzone-api-534526154363.us-central1.run.app/users';
  private currentUserRole: string | null = null;

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  isAdmin(): Observable<boolean> {
    return this.getUserRole().pipe(
      map((role) => role === 'admin')
    );
  }  

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

  registerAdmin(email: string, password: string, name: string, role: string = 'admin'): Observable<any> {
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
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((userCredential) => {
        console.log('Usuario autenticado:', userCredential.user?.uid);
        return userCredential.user;
      })
    );
  }  

  logout(): Observable<void> {
    this.currentUserRole = null;
    return from(this.afAuth.signOut());
  }

  resetPassword(email: string): Observable<void> {
    return from(this.afAuth.sendPasswordResetEmail(email));
  }

  getUserRole(): Observable<string | null> {
    console.log('getUserRole llamado');
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        console.log('Cambio detectado en authState:', user); // Log para depurar el estado
        if (user?.uid) {
          console.log('UID detectado:', user.uid);
          return this.http.get<{ role: string }>(`${this.apiUrl}/firebase/${user.uid}`).pipe(
            map((data) => {
              console.log('Rol recibido:', data.role);
              this.currentUserRole = data.role;
              return data.role;
            }),
            catchError((err) => {
              console.error('Error al obtener rol:', err);
              return of(null);
            })
          );
        } else {
          console.warn('No hay usuario autenticado');
          return of(null);
        }
      })
    );
  }

  getUserData(): Observable<any> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user) => {
        if (user?.uid) {
          return this.http.get<any>(`${this.apiUrl}/firebase/${user.uid}`);
        } else {
          return of(null); // Si no hay usuario autenticado, retorna null
        }
      }),
      catchError(() => of(null)) // Manejo de errores
    );
  }
  
  updateUserData(data: any): Observable<any> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user) => {
        if (user?.uid) {
          const payload = { ...data, firebaseUserId: user.uid }; // Asegúrate de incluir el firebaseUserId
          return this.http.put(`${this.apiUrl}/firebase/${user.uid}`, payload, { responseType: 'text' }); // Cambia el tipo de respuesta a 'text'
        } else {
          throw new Error('No hay usuario autenticado.');
        }
      })
    );
  }  

  getFirebaseUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map((user) => user?.uid || null)
    );
  }
}