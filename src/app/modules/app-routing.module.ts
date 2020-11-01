import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/home/admin.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { AssignmentsResolver } from '../resolvers/assignments.resolver';
import { ClassesResolver } from '../resolvers/classes.resolver';
import { CoursesResolver } from '../resolvers/courses.resolver';
import { UsersResolver } from '../resolvers/users.resolver';

const routes: Routes = [

    {path: 'welcome', component: WelcomeComponent,
      resolve: {
        resolvedUsers: UsersResolver,
        resolvedCourses: CoursesResolver,
        resolvedClasses: ClassesResolver,
        resolvedAssignments: AssignmentsResolver
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
