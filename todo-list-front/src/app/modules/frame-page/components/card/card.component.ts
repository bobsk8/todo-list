import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '../../project/project.model';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() project = new Project();
  @Output() removeProject = new EventEmitter();
  @Output() setDoneTask = new EventEmitter();
  @Output() editTask = new EventEmitter();
  @Output() removeTask = new EventEmitter();
  @Output() saveTask = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeP(id: string): void {
    this.removeProject.emit(id);
  }

  setDoneT(project: Project, task: Task): void {
    this.setDoneTask.emit({project, task});
  }

  editT(project: Project, task: Task): void {
    this.editTask.emit({project, task});
  }

  removeT(project: Project, id: string): void {
    this.removeTask.emit({project, id});
  }

  saveT(project: Project): void {
    this.saveTask.emit({project});
  }

}
