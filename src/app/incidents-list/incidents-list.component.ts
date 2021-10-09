import { Component, OnInit, ViewChild } from '@angular/core';
import { Incident } from '../model/incident';
import {MessageService} from '../message.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.css']
})
export class IncidentsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'status', 'title', 'application', 'priority'];
  dataSource : Incident[] = [];

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    //this.initWSService();
    var that = this;
    this.messageService.initializeWebSocketConnection();
    that.messageService.stompClient.connect({}, function(frame) {
      that.messageService.stompClient.subscribe('/topic/newinc', (message) => {
        if (message.body) {
          const incident = JSON.parse(message.body).body as Incident;
          console.log(incident);

          that.dataSource.push(incident);
          that.table.renderRows();
        }
      });
    });

    var incident = new Incident();
    incident.id = "1";
    incident.status = "New";
    incident.title = "Database issue";
    incident.priority = "Critical";
    incident.application = "Tornado";
    this.dataSource.push(incident);

  }

  initWSService(): void {
    var that = this;
    this.messageService.initializeWebSocketConnection();
    that.messageService.stompClient.connect({}, function(frame) {
      that.messageService.stompClient.subscribe('/topic/newinc', (message) => {
        if (message.body) {
          const incident = JSON.parse(message.body).body as Incident;
          console.log(incident);
          that.dataSource.push(incident);
        }
      });
    });
  }

  ngOnDestroy(): void{
    this.messageService.stompClient.disconnect(function() {
    });
  }

}
