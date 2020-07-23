import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io from 'socket.io-client';
import { ChatMessage, ChatMessageType, ChatOrigin, ChatResponse, Product, ProductMeta, User } from './types';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  prodSearchSub = new BehaviorSubject<Product[]>([]);
  prodMetaSearchSub = new BehaviorSubject<ProductMeta[]>([]);
  userSearchSub = new BehaviorSubject<User[]>([]);
  chatSub = new BehaviorSubject<ChatMessage>(null);
  socket: SocketIOClient.Socket = io();

  async onLogin(idToken: string) {
    this.socket.io.opts.query = { token: idToken }
  }

  onLogout() {
      this.socket.io.opts.query = { token: null }
  }

  searchProducts(term: string) {
    this.socket.emit('search:product', term, (res: Product[]) => {
      this.prodSearchSub.next(res);
    });
  }

  searchProductMetas(term: string) {
    this.socket.emit('search:productMeta', term, (res: ProductMeta[]) => {
      this.prodMetaSearchSub.next(res);
    });
  }

  searchUsers(term: string) {
    this.socket.emit('search:user', term, (res: User[]) => {
      this.userSearchSub.next(res)
    });
  }

  sendChat(message) {
    this.chatSub.next({ text: message, type: ChatMessageType.TEXT, origin: ChatOrigin.USER });
    this.socket.emit('chat:message', message, (res: ChatResponse) => {
      let msg: ChatMessage;
      if (res.response_type == 'text')
        msg = { origin: ChatOrigin.BOT, type: ChatMessageType.TEXT, text: res.text };
      else if (res.response_type == 'image')
        msg = { origin: ChatOrigin.BOT, type: ChatMessageType.IMAGE, imageSrc: res.source };
      else if (res.typing)
        msg = { origin: ChatOrigin.BOT, type: ChatMessageType.TYPING, typing: res.typing };
      else
        return;

      this.chatSub.next(msg)
    });
  }

  get prodSearchResults$() {
    return this.prodSearchSub.asObservable();
  }

  get prodMetaSearchResults$() {
    return this.prodMetaSearchSub.asObservable();
  }

  get userSearchResults$() {
    return this.userSearchSub.asObservable();
  }

  get chatMessages$() {
    return this.chatSub.asObservable();
  }
}
