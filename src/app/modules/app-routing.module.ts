import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/home/admin.component';
import { HomeComponent } from '../components/home/home.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { AssignmentsResolver } from '../resolvers/assignments.resolver';
import { ClassesResolver } from '../resolvers/classes.resolver';
import { CoursesResolver } from '../resolvers/courses.resolver';
import { EnrollmentsResolver } from '../resolvers/enrollments.resolver';
import { MessagesResolver } from '../resolvers/messages-resolver';
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

    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: '**', component: WelcomeComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
