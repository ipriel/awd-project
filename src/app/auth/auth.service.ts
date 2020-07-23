import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SocketService } from '../shared/socket.service';
import { MixedSchema, User } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Gets the claims associated with the currently
   * logged in user. Contains any roles the user has.
   * @returns Promise<MixedSchema> of the claims object
   */
  async getUserClaims(): Promise<MixedSchema> {
    const res = await auth().currentUser.getIdTokenResult();
    return res.claims;
  }

  doLocalLogin(email: string, password: string): Promise<void | auth.UserCredential> {
    return new Promise<any>((resolve, reject) => {
      auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  doGoogleLogin(): Promise<void | auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.doSocialLogin(provider);
  }

  doFacebookLogin(): Promise<void | auth.UserCredential> {
    const provider = new auth.FacebookAuthProvider();
    return this.doSocialLogin(provider);
  }

  doTwitterLogin(): Promise<void | auth.UserCredential> {
    const provider = new auth.TwitterAuthProvider();
    return this.doSocialLogin(provider);
  }

  private doSocialLogin(provider: auth.AuthProvider): Promise<void | auth.UserCredential> {
    return this.afAuth.signInWithPopup(provider)
      .then(async (cred) => {
        const idToken = await this.afAuth.idToken.toPromise();
        this.socket.onLogin(idToken);
      });
  }

  /**
   * Gets the list of possible sign in methods for
   * the given email address.
   * @returns Promise<string[]> of the sign in methods
   */
  fetchSignInMethodsForEmail(email: string): Promise<string[]> {
    return auth().fetchSignInMethodsForEmail(email);
  }

  logout(): Promise<void> {
    return auth().signOut()
      .then(res => {
        this.socket.onLogout()
      });
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  /**
   * Gets the firebase userId of the current logged in user
   * @returns Observable<string> of the userId value or null
   */
  getUserID(): Observable<string> {
    return this.afAuth.user.pipe(
      map(user => (user != null) ? user.uid : null)
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUserID().pipe(
      map(uid => (uid != null) ? true : false)
    );
  }

  /**
   * Gets the user object corresponding to the firebase userId
   * from the database
   * @returns Observable<User> of the user object
   */
  getUser(): Observable<User> {
    return this.getUserID().pipe(
      switchMap(uid => this.http.get<User>('/api/user/by-uid/' + uid))
    );
  }

  constructor(private afAuth: AngularFireAuth, private socket: SocketService, private http: HttpClient) { }
}
