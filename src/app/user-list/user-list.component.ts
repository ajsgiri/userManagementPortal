import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Role } from '../shared/role';
import { User } from '../shared/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];
  roleNamesList: string[][];

  constructor(public crudApi: CrudService) { }

  ngOnInit() {
    this.userList = this.crudApi.getUserList();
    this.roleNamesList = this.userList.map(user => user.roles);
    this.downloadUsers()
  }

  deleteUser(user: User) {
    this.crudApi.deleteUser(user.$key);
    this.userList = this.crudApi.getUserList()

  }

  downloadUsers() {
    let downloadList = this.userList;
    let csvrecord = Object.keys(downloadList[0]).join(',') + '\n';
    downloadList.forEach(function (jsonrecord) {
      csvrecord += Object.values(jsonrecord).join(',') + '\n';
    });
    csvrecord = "key," + csvrecord;
    let a = document.createElement('a');
    a.href = 'data:' + csvrecord;
    a.download = 'data.csv';
    let downloadButton = document.getElementById('downloadButton');
    downloadButton.appendChild(a);
  }
}
