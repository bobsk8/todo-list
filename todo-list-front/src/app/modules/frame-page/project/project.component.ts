import { Component, OnInit } from '@angular/core';

import { ProjectService } from './project.service';
import { Project } from '../../../model/project.model';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];
  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  onSubmit(event: any): void {
    const project = event.project;
    if (!project.taskDescription) {
      return;
    }
    const task = Object.assign(new Task(), { id: project.taskId, description: project.taskDescription, completed: false });
    if (task.id) {
      this.updateTask(project, task);
    } else {
      this.saveTask(project, task);
    }
  }

  saveTask(project: Project, task: Task): void {
    this.projectService.addTask(project.id, task)
      .subscribe(resp => {
        project.tasks.push(resp);
        project.taskDescription = '';
      });
  }

  updateTask(project: Project, task: Task): void {
    this.projectService.updateTask(task.id, task)
      .subscribe(() => {
        project.tasks.forEach(ts => {
          if (ts.id === task.id) {
            ts.description = task.description;
          }
        });
        project.taskDescription = '';
      });
  }

  getProjects(): void {
    this.projectService.getAll()
      .subscribe(resp => this.projects = resp);
  }

  removeProject(projectId: number): void {
    this.projectService.delete(projectId)
      .subscribe(() => this.projects = this.projects.filter(project => project.id !== projectId));
  }

  removeTask(event: any): void {
    const project = event.project;
    const id = event.id;
    this.projectService.deleteTask(id)
      .subscribe(() => {
        project.tasks = project.tasks.filter(task => task.id !== id);
      });
  }

  editTask(event: any): void {
    const project = event.project;
    const task = event.task;
    project.taskId = task.id;
    project.taskDescription = task.description;
  }

  setDoneTask(event: any): void {
    const project = event.project;
    const task = event.task;
    task.completed = true;
    task.updatedAt = new Date();
    this.projectService.updateTask(task.id, task)
      .subscribe(() => {
        project.tasks.forEach(ts => {
          if (ts.id === task.id) {
            ts = task;
          }
        });
        project.taskDescription = '';
      });
  }

}
