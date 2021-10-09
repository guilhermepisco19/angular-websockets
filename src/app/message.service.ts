import { Injectable } from '@angular/core';

declare var SockJS;
declare var Stomp;
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient;
  public serie = [{
    name: 'series-1',
    data: []
  }];
  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/websocket-chart';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
  }

  sendMessage(message) {
    this.stompClient.send('/app/newincident' , {}, JSON.stringify(message));
  }
}