import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TaskListAPIService } from '../services/task-list-api.service';
import { CommonModule } from '@angular/common';
import { Button, ButtonDirective } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButton, SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { Dropdown, DropdownItem, DropdownModule } from 'primeng/dropdown';
import { SplitButton, SplitButtonModule } from "primeng/splitbutton"

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, DialogModule, CommonModule, SelectButtonModule, InputTextareaModule, CalendarModule, FormsModule, ReactiveFormsModule, MatDialogModule, DropdownModule, SplitButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  schemas: []
})
export class TaskListComponent {
  taskListColumns = [
    'Date',
    'Entity Name',
    'Task Type',
    'Time',
    'Contact Person',
    'Notes',
    'Status',
    'Options',
  ]
  taskListData = [
    {
      date: new Date().toDateString(),
      entity_name: 'PQR Private Limited',
      task_type: 'Meeting',
      // task_type: 'Call',
      // task_type: 'Video Call',
      time: new Date().getTime(),
      contact_person: 'Sansa Stark',
      notes: 'Lorem Ipsum',
      status: 'Open',
      // status: 'Closed',
      options: 'Options',
    }
  ]
  taskListFormDialogvisible = false
  calendarModel: Date = new Date()
  stateOptions: any[] = [{ label: 'Open', value: 'Open', color: '#f37f37' }, { label: 'Closed', value: 'Closed', color: '' }];
  taskForm: FormGroup;
  items
  constructor(
    private taskListService: TaskListAPIService,
    private taskFormBuilder: FormBuilder,

  ) {
    this.taskForm = new FormGroup(
      {
        date: new FormControl(new Date(), [Validators.required]),
        entity_name: new FormControl(null, [Validators.required]),
        task_type: new FormControl(null, [Validators.required]),
        time: new FormControl(new Date(), [Validators.required]),
        phone_number: new FormControl(null, [Validators.required]),
        contact_person: new FormControl(null, [Validators.required]),
        note: new FormControl(null, []),
        status: new FormControl(null, [Validators.required]),
      }
    )

    this.items = [
      { separator: true },
      {
        label: 'Edit',
        icon: '',
        command: () => {
          this.taskListFormDialogvisible = true
        }
      },
      {
        label: 'Duplicate',
        icon: '',
        command: () => {
          // this.delete();
        }
      },
      { label: 'Change Status to Closed', icon: '', },
    ];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  onTaskFormSave(event: any) {
    console.log(event);

    console.log(this.taskForm.getRawValue());

  }
}
