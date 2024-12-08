import { TestBed } from '@angular/core/testing';

import { TaskListAPIService } from './task-list-api.service';

describe('TaskListAPIService', () => {
  let service: TaskListAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
