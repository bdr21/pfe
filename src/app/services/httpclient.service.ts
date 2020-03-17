import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../model/Student';
import { User } from '../model/User';
import { Teacher } from '../model/Teacher';
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  getNotes() {
   return this.httpClient.get<Note[]>("http://localhost:8080/api/notes/get");
  }

  constructor(private httpClient: HttpClient) { }

  getUser(username: String) {
    return this.httpClient.get<User>("http://localhost:8080/api/user/get" + "/" + username);
  }
  getStudents() {
    return this.httpClient.get<Student[]>('http://localhost:8080/api/students/get');
  }
  getStudentsByFiliere(filiere : string) {
    return this.httpClient.get<Student[]>("http://localhost:8080/api/students/get/filiere" + "/" + filiere);
  }
  getStudentsByClasse(classe : string) {
    return this.httpClient.get<Student[]>("http://localhost:8080/api/students/get/classe" + "/" + classe);
  }
  getNOS() {
    return this.httpClient.get<Number>('http://localhost:8080/api/students/get/nos');
  }
  addStudent(newStudent: Student) {
    return this.httpClient.post<Student>('http://localhost:8080/api/students/add', newStudent);
  }
  deleteStudent(id: number) {
    return this.httpClient.delete<Student>("http://localhost:8080/api/students" + "/" + id);
  }
  getStudent(id: number) {
    return this.httpClient.get<Student>('http://localhost:8080/api/students/get' + "/" + id);
  }
  updateStudent(student: Student) {
    return this.httpClient.put<Student>('http://localhost:8080/api/students/update', student);
  }
  /*                       Teacher Service                                 */
  getTeachers() {
    return this.httpClient.get<Teacher[]>('http://localhost:8080/api/teachers/get');
  }
  getTeachersByFiliere(filiere : string) {
    return this.httpClient.get<Teacher[]>("http://localhost:8080/api/teachers/get/filiere" + "/" + filiere);
  }
  getNOT() {
    return this.httpClient.get<Number>('http://localhost:8080/api/teachers/get/not');
  }
  addTeacher(newTeacher: Teacher) {
    return this.httpClient.post<Teacher>('http://localhost:8080/api/teachers/add', newTeacher);
  }
  deleteTeacher(id: number) {
    return this.httpClient.delete<Teacher>("http://localhost:8080/api/teachers" + "/" + id);
  }
  getTeacher(id: number) {
    return this.httpClient.get<Teacher>('http://localhost:8080/api/teachers/get' + "/" + id);
  }
  updateTeacher(teacher: Teacher) {
    return this.httpClient.put<Teacher>('http://localhost:8080/api/teachers/update', teacher);
  }


}





