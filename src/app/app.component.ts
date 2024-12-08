import { TableModule } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from "./task-list/task-list.component";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from 'primeng/dialog';
import { DropdownItem, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, TableModule, DialogModule, DropdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) {

  }
  title = 'taskListApp';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.primengConfig.zIndex = {
    //   modal: 1100,    // dialog, sidebar
    //   overlay: 1000,  // dropdown, overlaypanel
    //   menu: 1000,     // overlay menus
    //   tooltip: 1100   // tooltip

    // }
  };
}
