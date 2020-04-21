import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../project/project.service';
import { Project } from '../../../model/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  edit = false;
  submitted = false;
  projectForm: FormGroup;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.projectForm = this.createForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProjectById(parseInt(id, 10));
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [],
      name: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup): void {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    const project = Object.assign(new Project(), form.value);
    if (this.edit) {
      this.editProject(project);
    } else {
      this.saveProject(project);
    }
  }

  getProjectById(id: number): void {
    this.projectService.getById(id)
    .subscribe(resp => {
      this.projectForm.get('name').setValue(resp.name);
      this.projectForm.get('id').setValue(resp.id);
      this.edit = true;
    });
  }

  saveProject(project: Project): void {
    this.projectService.save(project)
    .subscribe(() => {
      alert('Project save!');
      this.router.navigate(['project']);
    });
  }

  editProject(project: Project): void {
    this.projectService.update(project.id, project)
    .subscribe(() => {
      alert('Project update!');
      this.router.navigate(['project']);
    });
  }

}
