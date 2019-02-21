import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../shared/crud.service'; 
import { Role } from '../shared/role';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})

export class AddRoleComponent implements OnInit {
  role: Role;
  permissions: string[] = ["create", "read", "update", "delete", "publish", "archive"]
  selectedPermission: string[] = [];

  constructor(public crudApi: CrudService) { }

  ngOnInit() {
    this.crudApi.getRoleList(); // instatiate RoleList
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
    this.role = {
      $key: key,
      name: myForm.value.roleName,
      roleID: myForm.value.roleId,
      permissions: this.getSelectedPermission(myForm),
    }
    this.crudApi.addRole(this.role);
  }

}
