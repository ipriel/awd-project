import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { SocketService } from '../socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async getUserClaims() {
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

  fetchSignInMethodsForEmail(email: string) {
    return auth().fetchSignInMethodsForEmail(email);
  }

  logout() {
    return auth().signOut()
      .then(res => {
        this.socket.onLogout()
      });
  }

  constructor(private afAuth: AngularFireAuth, private socket: SocketService) { }
}
