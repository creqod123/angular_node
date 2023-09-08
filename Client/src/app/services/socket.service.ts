import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io(environment.serverUrl); // Make sure this is the correct URL for your server
  }

  onMessage() {
    return new Observable((observer) => {
      this.socket.on('helloworld123', (data: any) => {
        console.log('check123')
        observer.next(data);
      });
    });
  }
  
}
