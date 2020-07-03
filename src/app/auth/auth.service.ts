import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthModule } from './auth.module';

@Injectable({
  providedIn: AuthModule
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
    let provider = new auth.GoogleAuthProvider();
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
      .catch(err => {
        console.log(err);
      });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      auth().signOut()
        .then(res => {
          resolve(null);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  constructor(private afAuth: AngularFireAuth) { }
}
