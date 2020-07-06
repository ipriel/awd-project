import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  private searchSub = new BehaviorSubject(null);
  private chatSub = new BehaviorSubject(null);

  async onLogin() {
    const idToken = await this.afAuth.idToken.toPromise();
    this.socket.io.opts.query = { token: idToken }
  }

  onLogout() {
    this.socket.io.opts.query = { token: null }
  }

  search(term) {
    this.socket.emit('search', term, (res: any) => this.searchSub.next(res));
  }

  sendChat(message) {
    this.socket.emit('chat:message', message, (data) => this.chatSub.next(data.response));
  }

  get searchResults$() {
    return this.searchSub.asObservable();
  }

  get chatMessages$() {
    return this.chatSub.asObservable();
  }

  constructor(private afAuth: AngularFireAuth) { 
    this.socket = io();
    
    this.socket.on('update', (data: any) => {
      //sync with store
    });
  }
}
