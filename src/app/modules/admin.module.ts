import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/home/admin.component';
import { UsersResolver } from '../resolvers/users.resolver';
import { AdminRouteActivator } from '../admin/admin-route-activator';
import { StudentsComponent } from '../admin/components/students.component';
import { ClassesResolver } from '../resolvers/classes.resolver';
import { EnrollmentsResolver } from '../resolvers/enrollments.resolver';
import { MatExpansionModule } from '@angular/material/expansion';
import { EnrollmentsComponent } from '../admin/components/enrollments.component';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { InstructorsComponent } from '../admin/components/instructors.component';
import { AssignmentsResolver } from '../resolvers/assignments.resolver';
import { InstructorsResolver } from '../resolvers/instructors-resolver.service';
import { ClassResolver } from '../resolvers/class.resolver';
import { CoursesResolver } from '../resolvers/courses.resolver';
import { ClassEditComponent } from '../admin/components/class-edit.component';
import { AssignmentsComponent } from '../admin/components/assignments.component';
import { ContentComponent } from '../admin/components/content.component';
import { SeriesResolver } from '../resolvers/series.resolver';
import { MaterialsAdminComponent } from '../admin/components/materials-admin.component';
import { MaterialsResolver } from '../resolvers/materials-resolver';

const adminRoutes: Routes = [

    {
        path: 'admin', component: AdminComponent,
        canActivate: [AdminRouteActivator],
        resolve: { users: UsersResolver },
        children: [
            { path: '', redirectTo: 'classes', pathMatch: 'full' },
            { path: 'students', component: StudentsComponent,
              resolve: {
                  users: UsersResolver,
                  classes: ClassesResolver,
                  enrollments: EnrollmentsResolver }},
            { path: 'instructors', component: InstructorsComponent,
              resolve: {
                  users: UsersResolver,
                  instructors: InstructorsResolver,
                  classes: ClassesResolver,
                  assignments: AssignmentsResolver }},
            { path: 'classes/:id/edit', component: ClassEditComponent,
              resolve: {
                  users: UsersResolver,
                  thisClass: ClassResolver,
                  courses: CoursesResolver
            }},
            { path: 'classes', component: ContentComponent,
                resolve: {
                    users: UsersResolver,
                    instructors: InstructorsResolver,
                    classes: ClassesResolver,
                    series: SeriesResolver,
                    courses: CoursesResolver }},
            { path: 'materials', component: MaterialsAdminComponent,
                resolve: {
                    courses: CoursesResolver,
                    materials: MaterialsResolver}},
            // { path: 'courses/:id/edit', pathMatch: 'full', component: CourseEditComponent,
            // canDeactivate: [ CourseEditGuard ],
            // resolve: { course: CourseResolver,
            //     allmaterials: AllMaterialsResolver }},
            // { path: 'courseObjects/:id/edit', pathMatch: 'full', component: CourseObjectEditComponent,
            // canDeactivate: [ CourseObjectEditGuard ],
            // resolve: { course: CourseResolver,
            //     allmaterials: AllMaterialsResolver }},
        ]
    },

];

@NgModule({

    imports: [
        RouterModule.forChild(adminRoutes),
        SharedModule,
        CommonModule,
    ],
    declarations: [
        AdminComponent,
        StudentsComponent,
        EnrollmentsComponent,
        InstructorsComponent,
        AssignmentsComponent,
        ClassEditComponent,
        ContentComponent,
        MaterialsAdminComponent
    ],
    providers: [
        AdminRouteActivator,
    ],
    exports: [
        SharedModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AdminModule { }
