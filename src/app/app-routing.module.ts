import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { StudentsComponent } from './modules/students/students.component';
import { TeachersComponent } from './modules/teachers/teachers.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'posts',
      component: PostsComponent
    },
    {
      path: 'students',
      component: StudentsComponent
    },
    {
      path: 'teachers',
      component: TeachersComponent
    }]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
