import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project.model';

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

  getProjects() {
    this.projectService.getAll()
    .subscribe(resp => this.projects = resp);
  }

}
