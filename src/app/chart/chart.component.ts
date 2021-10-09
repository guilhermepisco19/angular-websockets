import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../node_modules/canvasjs-2.3.2/canvasjs.min.js';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    let dataPoints = [];
    let dpsLength = 0;
    let chart = new CanvasJS.Chart("chartContainer",{
      exportEnabled: true,
      title:{
        text:"Live Chart with Data-Points from External JSON"
      },
      data: [{
        type: "spline",
        dataPoints : dataPoints,
      }]
    });
	

		dpsLength = dataPoints.length;
		chart.render();
    var that = this;
    this.messageService.initializeWebSocketConnection();
    that.messageService.stompClient.connect({}, function(frame) {
      that.messageService.stompClient.subscribe('/topic/greetings', (message) => {
        if (message.body) {
          updateChart(message.body);
        }
      });
    });

    function updateChart(value) {	
    
        dataPoints.push({
          x: dpsLength,
          y: parseInt(value)
        });
        dpsLength++;
      
      
      if (dataPoints.length >  20 ) {
            dataPoints.shift();				
          }
      chart.render();
    }
  }

  ngOnDestroy(): void{
    this.messageService.stompClient.disconnect(function() {
    });
  }

}
