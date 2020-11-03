import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/home/admin.component';
import { ClassComponent } from '../components/classes/class/class.component';
import { HomeComponent } from '../components/home/home.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { AllMaterialsResolver } from '../resolvers/all-materials.resolver';
import { AllAnnouncementsResolver } from '../resolvers/allannouncements.resolver';
import { AllDiscussionSettingsResolver } from '../resolvers/alldiscussion-settings-resolver';
import { AnnouncementsResolver } from '../resolvers/announcements.resolver';
import { AssignmentsResolver } from '../resolvers/assignments.resolver';
import { ClassCourseResolver } from '../resolvers/class-course.resolver';
import { ClassResolver } from '../resolvers/class.resolver';
import { ClassesResolver } from '../resolvers/classes.resolver';
import { CoursesResolver } from '../resolvers/courses.resolver';
import { DiscussionSettingsResolver } from '../resolvers/discussion-settings-resolver';
import { EnrollmentsResolver } from '../resolvers/enrollments.resolver';
import { MaterialsResolver } from '../resolvers/materials-resolver';
import { MessagesResolver } from '../resolvers/messages-resolver';
import { NotesSettingsResolver } from '../resolvers/notes-settings.resolver';
import { UsersResolver } from '../resolvers/users.resolver';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [

    {path: 'welcome', component: WelcomeComponent,
      resolve: {
        resolvedUsers: UsersResolver,
        resolvedCourses: CoursesResolver,
        resolvedClasses: ClassesResolver,
        resolvedAssignments: AssignmentsResolver
      }
    },
    {
      path: 'classes', component: HomeComponent, canActivate: [AuthGuard],
      resolve: {
        resolvedUsers: UsersResolver,
        resolvedClasses: ClassesResolver,
        resolvedCourses: CoursesResolver,
        resolvedEnrollments: EnrollmentsResolver,
        resolvedAssignments: AssignmentsResolver,
        resolvedMessages: MessagesResolver
      }
    },
    {
      path: 'classes/:id', canActivate: [AuthGuard], resolve: {
        classes: ClassesResolver,
        courses: CoursesResolver,
      },
      children: [{
        path: ':id2', pathMatch: 'full', component: ClassComponent,
        resolve: {
          resolvedUsers: UsersResolver,
          resolvedClasses: ClassesResolver,
          resolvedAssignments: AssignmentsResolver,
          resolvedEnrollments: EnrollmentsResolver,
          resolvedCourses: CoursesResolver,
          resolvedMessages: MessagesResolver,
          resolvedAnnouncements: AllAnnouncementsResolver,
          resolvedCurrentCourse: ClassCourseResolver,
          resolvedNotesSettings: NotesSettingsResolver,
          resolvedMaterials: MaterialsResolver,

        }
      }]
    },

    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: '**', component: WelcomeComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
