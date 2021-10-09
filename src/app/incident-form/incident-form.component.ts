import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from '../message.service';
import { Incident } from '../model/incident';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css']
})
export class IncidentFormComponent implements OnInit {

  incident : Incident;

  constructor(
    private router: Router, 
    private messageService: MessageService) { 
    
      this.incident = new Incident();
  }

  ngOnInit(): void {
    this.messageService.initializeWebSocketConnection();
    this.messageService.stompClient.connect({}, function(frame) {
    });
  }
  
  onSubmit(): void {
    this.messageService.sendMessage(this.incident);
    this.gotoUserList();
  }

  gotoUserList() {
    this.router.navigate(['/home']);
  }

}
