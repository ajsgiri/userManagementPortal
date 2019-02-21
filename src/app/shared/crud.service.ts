import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Role } from '../shared/role';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor() { }

  userList: User[] = [];
  roleList: Role[] = [];
  role: Role;
  user: User;

  getUserList(): User[] {
    if (window.localStorage.getItem("userList") === null) {
      window.localStorage.setItem("userList", JSON.stringify(this.userList))
    }
    return JSON.parse(window.localStorage.getItem("userList"));
  }

  getUser(userTarget: string): User {
    let list: User[] = this.getUserList();
    let filteredList: User[] = list.filter(user => {
      if (user.$key == userTarget) {
        return user;
      }
    })
    return filteredList[0];
  }

  addUser(user: User) {
    let list: User[] = this.getUserList();
    list.push(user);
    return window.localStorage.setItem("userList", JSON.stringify(list));
  }

  deleteUser(userRemoved: string) {
    let list: User[] = this.getUserList();
    let newList: User[] = list.filter(user => {
      if (user.$key !== userRemoved) {
        return user;
      }
    })
    window.localStorage.setItem("userList", JSON.stringify(newList))
  }

  getRoleList(): Role[] {
    if (window.localStorage.getItem("roleList") === null) {
      window.localStorage.setItem("roleList", JSON.stringify(this.roleList))
    }
    return JSON.parse(window.localStorage.getItem("roleList"));
  }

  getRole(roleTargetID): Role {
    let list: Role[] = this.getRoleList();
    let filteredList: Role[] = list.filter(role => {
      if (role.$key == roleTargetID) {
        return role;
      }
    })
    return filteredList[0];
  }

  addRole(role: Role) {
    let list: Role[] = this.getRoleList();
    list.push(role);
    window.localStorage.setItem("roleList", JSON.stringify(list));
  }

  deleteRole(roleRemoved: string) {
    //remove from UserList
    let role: Role = this.getRole(roleRemoved);
    let roleName = role.name;
    let unfilteredList: User[] = this.getUserList();
    let filteredList = unfilteredList.map((user) => {
      user.roles = user.roles.filter((elem) => (elem !== roleName))
      return user;
    })
    window.localStorage.setItem("userList", JSON.stringify(filteredList))

    //remove from roleList
    let list: Role[] = this.getRoleList();
    let newList: Role[] = list.filter(role => {
      if (role.$key !== roleRemoved) {
        return role;
      }
    })
    window.localStorage.setItem("roleList", JSON.stringify(newList))

  }

}
