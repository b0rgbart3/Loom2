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

const adminRoutes: Routes = [

    {
        path: 'admin', component: AdminComponent,
        canActivate: [AdminRouteActivator],
        resolve: { users: UsersResolver },
        children: [
            { path: '', redirectTo: 'classes', pathMatch: 'full' },
            { path: 'students', component: StudentsComponent, resolve: { users: UsersResolver,
                classes: ClassesResolver, enrollments: EnrollmentsResolver }},
        ]
    },

];

@NgModule({

    imports: [
        RouterModule.forChild(adminRoutes),
        SharedModule,
    ],
    declarations: [
        AdminComponent,
        StudentsComponent,
        EnrollmentsComponent,
    ],
    providers: [
        AdminRouteActivator,
    ],
    exports: [

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AdminModule { }
