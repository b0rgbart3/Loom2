import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { AssignmentsService } from '../services/assignments.service';
import { CourseService } from '../services/course.service';
import { ClassesResolver } from '../resolvers/classes.resolver';
import { ClassService } from '../services/class.service';
import { AssignmentsResolver } from '../resolvers/assignments.resolver';
import { Globals } from 'src/globals';
import { MessageService } from '../services/message.service';
import { LoomNotificationsService } from '../services/loom.notifications.service';
import { UserService } from '../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavBarComponent } from '../components/navbar/nav-bar.component';
import { ClassListComponent } from '../components/classes/class-list/class-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { ClassThumbComponent } from '../components/classes/class-list/class-thumb.component';
import { MaterialService } from '../services/material.service';
import { SeriesService } from '../services/series.service';
import { SharedModule } from './shared.module';
import { AdminModule } from './admin.module';
import { EnrollmentsResolver } from '../resolvers/enrollments.resolver';
import { StudentsComponent } from '../admin/components/students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnrollmentsService } from '../services/enrollments.service';
import { HomeComponent } from '../components/home/home.component';
import { MainClassComponent } from '../components/classes/class/main-class.component';
import { CourseSectionComponent } from '../components/courses/course/course-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    HomeComponent,
    MainClassComponent,
    CourseSectionComponent,
  ],
  imports: [
    AdminModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [

  ],
  exports: [
    SharedModule
  ],
  bootstrap: [AppComponent],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
