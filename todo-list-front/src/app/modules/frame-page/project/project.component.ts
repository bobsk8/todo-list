import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project.model';
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

  onSubmit(project: Project) {
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

  saveTask(project: Project, task: Task) {
    this.projectService.addTask(project.id, task)
      .subscribe(resp => {
        project.tasks.push(resp);
        project.taskDescription = '';
      });
  }

  updateTask(project: Project, task: Task) {
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

  getProjects() {
    this.projectService.getAll()
      .subscribe(resp => this.projects = resp);
  }

  removeProject(projectId: string) {
    this.projectService.delete(projectId)
      .subscribe(() => { });
  }

  removeTask(project: Project, id: string) {
    this.projectService.deleteTask(id)
      .subscribe(() => {
        project.tasks = project.tasks.filter(task => task.id !== id);
      });
  }

  editTask(project: Project, task: Task) {
    project.taskId = task.id;
    project.taskDescription = task.description;
  }

  setDoneTask(project: Project, task: Task) {
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
