import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { User } from '../shared/user';
import { Role } from '../shared/role';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  userList: User[];
  roleList: Role[];
  roleNameArray: string[];
  selectedRoles: string[];
  selectedRolesArray: Role[];
  
  user: User;

  constructor(
    public crudApi: CrudService,
    public location: Location,
    public actRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.user = this.crudApi.getUser(id);
    this.roleList = this.crudApi.getRoleList();
    this.roleNameArray = this.roleList.map( role => role.name);
  }

  getSelectedRoles(myForm) {
    this.selectedRoles = [];
    this.roleNameArray.forEach((roleName, i) => {
      if (myForm.value.rolesSelected[roleName] == true) {
        this.selectedRoles.push(roleName);
      }
    });
    console.log(this.selectedRoles);
    return this.selectedRoles;
  }

  handleSubmit(myForm) {
    let d = new Date(); //pseudo random key generator
    let key = (Math.floor(Math.random() * 1000) + 1) + (d.getMilliseconds()).toString();
    // only used for simplicity in a clientside application with no backend
    let newUser: User = {
      $key: key,
      name: myForm.value.name,
      userID: myForm.value.userID,
      roles: this.getSelectedRoles(myForm),
    }
    this.crudApi.deleteUser(this.user.$key)
    this.crudApi.addUser(newUser);
  }


}
