// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  devices: any[] = [];

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addDeviceUpdateListener();
    this.signalRService.listenTriggerScan();
  }
  hello():void{
    let inp ='Hellow'
    this.signalRService.sayhellotoBackend(inp);

  }
}
