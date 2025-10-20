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
    debugger
    this.signalRService.deviceUpdates$.subscribe((payload) => {
      if (payload && payload.scan_result) {
        this.devices = payload.scan_result.devices;
        debugger
        // can also update charts/cards here
      }
    });
  }
}
