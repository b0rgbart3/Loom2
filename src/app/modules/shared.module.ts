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

import { LoomNotificationsService } from '../services/loom.notifications.service';
import { UserService } from '../services/user.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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

import { SeriesResolver } from '../resolvers/series.resolver';
import { UserThumbnailComponent } from '../components/users/user-thumb/user-thumbnail.component';
import { SafePipe } from '../shared/safe.pipe';
import { InstructorsResolver } from '../resolvers/instructors-resolver.service';
import { UserListComponent } from '../admin/components/user-list.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Announcements } from '../models/announcements.model';
import { AnnouncementsService } from '../services/announcements.service';
import { AnnouncementsResolver } from '../resolvers/announcements.resolver';
import { AllAnnouncementsResolver } from '../resolvers/allannouncements.resolver';
import { NotesService } from '../services/notes.service';
import { NotesSettingsResolver } from '../resolvers/notes-settings.resolver';

import { MaterialCollectionComponent } from '../components/materials/material-collection/material-collection.component';
import { BookComponent } from '../components/materials/books/book.component';
import { ImageComponent } from '../components/materials/image/image.component';
import { BlockComponent } from '../components/materials/block/block.component';
import { QuoteComponent } from '../components/materials/quote/quote.component';
import { DocComponent } from '../components/materials/doc/doc.component';
import { AudioComponent } from '../components/materials/audio/audio.component';
import { VideoComponent } from '../components/materials/video/video.component';
import { DisplayMaterialsComponent } from '../components/materials/display-materials/display-mats.component';

@NgModule({
  declarations: [
    ClassListComponent,
    ClassThumbComponent,
    UserThumbnailComponent,
    UserListComponent,
    SafePipe,

    DisplayMaterialsComponent,
    MaterialCollectionComponent,
    AudioComponent,
    BookComponent,
    ImageComponent,
    VideoComponent,
    BlockComponent,
    QuoteComponent,
    DocComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,

  ],
  providers: [
    AuthGuard,
    AnnouncementsService,
    AssignmentsService,
    ClassService,
    CourseService,
    EnrollmentsService,
    UserService,
    MaterialService,
    NotesService,
    SeriesService,
    HttpClientModule,
    LoomNotificationsService,

    AssignmentsResolver,
    ClassesResolver,
    EnrollmentsResolver,
    InstructorsResolver,
    AnnouncementsResolver,
    AllAnnouncementsResolver,
    EnrollmentsResolver,
    NotesSettingsResolver,
    SeriesResolver,

    HttpClient,
    Globals,

    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  exports: [
    ClassListComponent,
    ClassThumbComponent,
    UserThumbnailComponent,
    UserListComponent,
    SafePipe,

    DisplayMaterialsComponent,
    MaterialCollectionComponent,
    AudioComponent,
    BookComponent,
    ImageComponent,
    VideoComponent,
    BlockComponent,
    QuoteComponent,
    DocComponent,

    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,


  ]
})
export class SharedModule { }
