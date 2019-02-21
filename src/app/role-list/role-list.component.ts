import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service'; 
import { Role } from '../shared/role';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roleList: Role[];

  constructor(public crudApi: CrudService) { }

  ngOnInit() {
    this.roleList = this.crudApi.getRoleList(); //
  }

  deleteRole(role: Role) {
    this.crudApi.deleteRole(role.$key);
    this.roleList = this.crudApi.getRoleList()
  }

}
