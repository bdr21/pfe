import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatCard, MatCardModule, MatGridListModule, MatIconModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { StudentsComponent } from 'src/app/modules/students/students.component';
import { StudentsTableComponent } from 'src/app/modules/students/students-table/students-table.component';
import { TeachersComponent } from 'src/app/modules/teachers/teachers.component';




@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    StudentsComponent,
    TeachersComponent,
    StudentsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DefaultModule { }
