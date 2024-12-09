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
import { firstValueFrom } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter'
import { MultiSelectModule } from "primeng/multiselect"
import { ListboxModule } from "primeng/listbox"
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, DialogModule, CommonModule, SelectButtonModule, InputTextareaModule, CalendarModule, FormsModule, ReactiveFormsModule, MatDialogModule, DropdownModule, SplitButtonModule, InputNumberModule, KeyFilterModule, MultiSelectModule, ListboxModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  schemas: []
})
export class TaskListComponent {
  taskListColumns = [
    { key: 'date', sortable: true, header: 'Date' },
    { key: 'entity_name', sortable: true, header: 'Entity Name' },
    { key: 'task_type', sortable: true, header: 'Task Type' },
    { key: 'time', sortable: true, header: 'Time' },
    { key: 'contact_person', sortable: true, header: 'Contact Person' },
    { key: 'note', sortable: true, header: 'Notes' },
    { key: 'status', sortable: true, header: 'Status' },
    { key: 'options', sortable: true, header: 'Options' },
  ]
  taskListData: Array<any> = [
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
  stateOptions: any[] = [{ label: 'Open', value: 'Open', color: '#f37f37' }, { label: 'Closed', value: 'Closed', color: '' }];
  taskForm: FormGroup;
  items
  digitRegex = /^\D*$/
  constructor(
    private taskService: TaskListAPIService,

  ) {
    this.taskForm = new FormGroup(
      {
        date: new FormControl(null, [Validators.required]),
        entity_name: new FormControl(null, [Validators.required]),
        task_type: new FormControl(null, [Validators.required]),
        time: new FormControl(null, [Validators.required]),
        phone_number: new FormControl(null, [Validators.required]),
        contact_person: new FormControl(null, [Validators.required]),
        note: new FormControl(null, []),
        status: new FormControl(null, [Validators.required]),
      }
    )

    this.items = [
      {
        label: 'Edit',

        command: (test: any) => {
          console.log(test);

          this.taskListFormDialogvisible = true

        }
      },
      {
        label: 'Duplicate',

        command: () => {
          // this.delete();
        }
      },
      { label: 'Change Status to Closed', },
    ];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadTaskListTable()
  }

  loadTaskListTable() {
    this.taskService.fetchTasks().subscribe(
      {
        next: (res: any) => {
          console.log(res);

          this.taskListData = res
          this.taskListData.map(task => { return { ...task, taskOptionsButtonConfig: this.items } }
          )
        }
      }
    )

  }

  async onTaskFormSave(event: any) {
    if (this.taskForm.valid) {
      const response = await firstValueFrom(this.taskService.createTask(this.taskForm.getRawValue()))
      if (response) {
        console.log(response);

        this.taskListFormDialogvisible = false
        this.taskForm.reset()
        this.taskForm.updateValueAndValidity()
        this.loadTaskListTable()
      }
    }

  }

  async onTaskUpdate() {
    // this.taskService.updateTask()
  }

  setTaskOptionsFunctionality(event: any, index: any) {

    this.taskListData[index]['model_options'] = [
      {
        label: 'Edit',
        command: () => {
          this.taskListFormDialogvisible = true
          this.setTaskFormForUpdate(this.taskListData[index])
        }
      },
      {
        label: 'Duplicate',
        command: () => {
          // this.taskListFormDialogvisible = true
          // this.setTaskFormForUpdate(this.taskListData.splice(index + 1, 0, this.taskListData[index]))
        }
      },
      {
        label: `Change Status to ${this.taskListData[index]['status'].toLowerCase() == 'open' ? 'Close' : 'Open'}`,
        command: () => {

        }
      },
    ]
  }

  setTaskFormForUpdate(taskData: any) {
    this.taskForm.patchValue(
      taskData
    )
    this.taskForm.updateValueAndValidity()
  }
}
