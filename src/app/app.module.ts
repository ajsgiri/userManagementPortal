import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RoleListComponent } from './role-list/role-list.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRoleComponent,
    AddUserComponent,
    EditRoleComponent,
    EditUserComponent,
    RoleListComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
