import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { User } from '../shared/user';
import { Role } from '../shared/role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  userList: User[];
  roleList: Role[];
  selectedRoles: string[];
  selectedRolesArray: Role[];
  roleNameArray: string[];
  user: User;

  constructor(public crudApi: CrudService) { }

  ngOnInit() {
    this.crudApi.getUserList();
    this.roleList = this.crudApi.getRoleList();
    this.roleNameArray = this.roleList.map(role => role["name"])
    this.userList = this.crudApi.getUserList();
  }

  getSelectedRoles(myForm) {
    this.selectedRoles = [];
    this.roleNameArray.forEach((roleName, i) => {
      if (myForm.value.rolesSelected[roleName] == true) {
        this.selectedRoles.push(roleName);
      }
    });

    this.getArrayRoles(this.selectedRoles);
    return this.selectedRoles;
  }

  getArrayRoles(selectedNames: string[]) {
    this.selectedRolesArray = this.roleList.filter((role) => {
      if (selectedNames.includes(role.name)) {
        return role;
      }
    })
    return this.selectedRolesArray;

  }

  handleSubmit(myForm) {
    let d = new Date(); //pseudo random key generator
    let key = (Math.floor(Math.random() * 1000) + 1) + (d.getMilliseconds()).toString();
    // only used for simplicity in a clientside application with no backend
    this.user = {
      $key: key,
      name: myForm.value.name,
      email: myForm.value.email,
      userID: myForm.value.userID,
      roles: this.getSelectedRoles(myForm),
    }
    this.crudApi.addUser(this.user);
  }

}
