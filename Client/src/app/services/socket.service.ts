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
    this.socket = io(`${environment.apiUrl}:${environment.port}`); // Make sure this is the correct URL for your server
  }

  onMessage() {
    return new Observable((observer) => {
      this.socket.on('getAll', (data: any) => {
        observer.next(data);
      });
    });
  }

}
