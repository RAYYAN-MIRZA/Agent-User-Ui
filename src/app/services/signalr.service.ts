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
      .withUrl(this.apiUrl, { 
      // Add the http/https configuration here
      skipNegotiation: true, // You may need this for certain deployment scenarios, 
      transport: signalR.HttpTransportType.WebSockets, // Force WebSockets for faster debugging
      // The crucial part for CORS:
      withCredentials: true // <--- ADD THIS
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.log('SignalR connection error:', err));
  }

  public addDeviceUpdateListener() {
    this.hubConnection.on("Receive Scan Update", (data: any) => {      
      console.log('backedn said->',data)
    });
  }

   public sayhellotoBackend(arg: any): Promise<any> {
  // Use 'return' to allow the calling component to handle the Promise (good practice)
  return this.hubConnection.invoke("SendScanResult", arg)
    .then((result) => {
      // The 'result' is the value returned by the C# SendScanResult method
      console.log('Backend successfully invoked. Server returned:', result);
      return result; // Return the result for further chaining
    })
    .catch((err) => {
      // Handle any exceptions or errors from the server-side method
      console.error('Error invoking SendScanResult on the backend:', err);
      throw err; // Re-throw the error
    });
}

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  
  public listenTriggerScan() {
    this.hubConnection.on("TriggerScan", (data: any) => {      
      console.log('backedn said->',data)
    });
  }

}
