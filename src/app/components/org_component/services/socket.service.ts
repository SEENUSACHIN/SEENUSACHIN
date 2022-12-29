import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
	providedIn: 'root'
})
export class SocketService {

  public message$: BehaviorSubject<null> = new BehaviorSubject(null);
	constructor(private socket: Socket) { }

  // socket1: any = io('ws://13.126.79.31:3000',
  //   {
  //     transports: ["websocket"]
  //   }
  // );

  // public sendMessage(message: any) {
  //   console.log('sendMessage: ', message)
  //   this.socket.emit('message', message);
  // }

  // public getNewMessage = () => {
  //   this.socket1.on('received_message', (message: any) =>{
  //     this.message$.next(message);
  //   });

  //   return this.message$.asObservable();
  // };

}
