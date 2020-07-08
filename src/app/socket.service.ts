import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  private prodSearchSub = new BehaviorSubject(null);
  private prodMetaSearchSub = new BehaviorSubject(null);
  private chatSub = new BehaviorSubject(null);

  async onLogin(idToken: string) {
    this.socket.io.opts.query = { token: idToken }
  }

  onLogout() {
    this.socket.io.opts.query = { token: null }
  }

  searchProducts(term) {
    this.socket.emit('search:product', term, (res: any) => this.prodSearchSub.next(res));
  }

  searchProductMetas(term) {
    this.socket.emit('search:productMeta', term, (res: any) => this.prodMetaSearchSub.next(res));
  }

  sendChat(message) {
    this.socket.emit('chat:message', message, (data) => this.chatSub.next(data.response));
  }

  get prodSearchResults$() {
    return this.prodSearchSub.asObservable();
  }

  get prodMetaSearchResults$() {
    return this.prodMetaSearchSub.asObservable();
  }

  get chatMessages$() {
    return this.chatSub.asObservable();
  }

  constructor() { 
    this.socket = io();
    
    this.socket.on('update', (data: any) => {
      //sync with store
    });
  }
}
