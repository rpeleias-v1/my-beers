import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeersListComponent } from './beer/components/beers-list/beers-list.component';
import { BeersCreateComponent } from './beer/components/beers-create/beers-create.component';

const beersRoutes: Routes = [
    { path: 'beers', component: BeersListComponent},
    { path: 'new-beers', component: BeersCreateComponent},
    { path: '', redirectTo: '/beers', pathMatch: 'full'}
]

@NgModule({
    imports: [
        RouterModule.forRoot(beersRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}