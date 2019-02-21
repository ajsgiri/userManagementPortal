import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service'; 
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { Role } from '../shared/role';


@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})

export class EditRoleComponent implements OnInit {
  permissions: string[] = ["create", "read", "update", "delete", "publish", "archive"]
  selectedPermission: string[] = [];
  role: Role;

  constructor(
    public crudApi: CrudService,      
    public location: Location,         
    public actRoute: ActivatedRoute,
    public router: Router,   
  ) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('id'); 
    this.role = this.crudApi.getRole(id);
  }

  getSelectedPermission(myForm) {
    this.selectedPermission = [];
    this.permissions.forEach((perm, i) => {
      if (myForm.value.permissions[perm] == true) {
        this.selectedPermission.push(perm);
      }
    })
    return this.selectedPermission;
  }

  handleSubmit(myForm) {
    let d = new Date(); //pseudo random key generator
    let key = (Math.floor(Math.random() * 1000) + 1) + (d.getMilliseconds()).toString();
    // only used for simplicity in a clientside application with no backend
    let newRole: Role = {
      $key: key,
      name: myForm.value.roleName,
      roleID: myForm.value.roleID,
      permissions: this.getSelectedPermission(myForm),
    }
    this.crudApi.deleteRole(this.role.$key);
    this.crudApi.addRole(newRole);
  }

}
