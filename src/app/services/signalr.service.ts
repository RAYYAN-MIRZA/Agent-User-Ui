// src/app/services/signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  public deviceUpdates$ = new BehaviorSubject<any>(null);
  private apiUrl:string = "https://localhost:44336/agentHub";
  constructor() {}

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.apiUrl) // backend hub endpoint
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.log('SignalR connection error:', err));
  }

  public addDeviceUpdateListener() {
    this.hubConnection.on('Recievec Scan Update', (data: any) => {
      this.deviceUpdates$.next(data);
    });
  }

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
