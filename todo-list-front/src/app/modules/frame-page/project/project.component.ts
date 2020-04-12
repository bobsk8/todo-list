import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  taskForm: FormGroup;
  projects: Project[] = [];
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getProjects();
    this.taskForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required]
    });
  }

  onSubmit(project: Project, form: any) {
    if (!form.valid) {
      return;
    }
    const task = Object.assign(new Task(), form.value);
    this.projectService.addTask(project.id, task)
    .subscribe(resp => project.tasks.push(resp));
  }

  getProjects() {
    this.projectService.getAll()
    .subscribe(resp => this.projects = resp);
  }

  removeProject(project: Project) {
    console.log(project);
  }

}
