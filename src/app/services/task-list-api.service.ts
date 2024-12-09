import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class TaskListAPIService {

  constructor(
    private http: HttpClient
  ) { }

  public createTask(newTask: any) {
    return this.http.post(environment.backendBaseUrl + 'tasks/create', newTask)
  }

  public fetchTasks() {
    return this.http.get(environment.backendBaseUrl + 'tasks/fetch')
  }

  public updateTask(taskId: string, updatedTask: any) {
    return this.http.put(environment.backendBaseUrl + 'tasks/update', updatedTask, {
      params: {
        'task_id': taskId
      }
    })
  }

}
