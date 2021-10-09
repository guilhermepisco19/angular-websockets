import { Component } from '@angular/core';
import {MessageService} from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fillerNav = [
    {icon: "home", label: "Home", routerLink: "/home"}, 
    {icon: "add", label: "Create Incident", routerLink: "/addincident"},
    {icon: "list", label: "Incidents", routerLink: "/incidents"},
    {icon: "show_chart", label: "Chart", routerLink: "/chart"}]

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    
  }

  title = 'angular-ws-app';

  shouldRun = true;
}
