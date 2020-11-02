import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { Pipe, NgModule } from '@angular/core';
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
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavBarComponent } from '../components/navbar/nav-bar.component';
import { ClassListComponent } from '../components/classes/class-list/class-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { ClassThumbComponent } from '../components/classes/class-list/class-thumb.component';
import { MaterialService } from '../services/material.service';
import { SeriesService } from '../services/series.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnrollmentsService } from '../services/enrollments.service';
import { EnrollmentsResolver } from '../resolvers/enrollments.resolver';
import { CacheInterceptor } from '../resolvers/cache.interceptor';
import { AuthGuard } from '../services/auth-guard.service';
import { MessagesResolver } from '../resolvers/messages-resolver';
import { UserThumbComponent } from '../components/users/user-thumb/user-thumb.component';
import { SafePipe } from '../shared/safe.pipe';
import { InstructorsResolver } from '../resolvers/instructors-resolver.service';

@NgModule({
  declarations: [
    ClassListComponent,
    ClassThumbComponent,
    UserThumbComponent,
    SafePipe,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatMenuModule,
    BrowserAnimationsModule,

  ],
  providers: [
    AuthGuard,
    AssignmentsService,
    ClassService,
    CourseService,
    EnrollmentsService,
    UserService,
    MaterialService,
    MessageService,
    SeriesService,
    HttpClientModule,
    LoomNotificationsService,
    EnrollmentsResolver,
    MessagesResolver,
    HttpClient,
    Globals,
    AssignmentsResolver,
    ClassesResolver,
    EnrollmentsResolver,
    InstructorsResolver,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  exports: [
    ClassListComponent,
    ClassThumbComponent,
    UserThumbComponent,
    SafePipe,

    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatMenuModule,
    BrowserAnimationsModule,


  ]
})
export class SharedModule { }
