import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/home/admin.component';
import { UsersResolver } from '../resolvers/users.resolver';
import { AdminRouteActivator } from '../admin/admin-route-activator';

const adminRoutes: Routes = [

    {
        path: 'admin', component: AdminComponent,
        canActivate: [AdminRouteActivator],
        resolve: { users: UsersResolver },
        children: [
            { path: '', redirectTo: 'classes', pathMatch: 'full' },
        ]
    },

];

@NgModule({

    imports: [
        RouterModule.forChild(adminRoutes)],
    declarations: [
        AdminComponent,
    ],
    providers: [
        AdminRouteActivator,
    ],
    exports: [

    ]
})
export class AdminModule { }
