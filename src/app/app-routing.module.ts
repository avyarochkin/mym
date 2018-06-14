import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { HotStuffComponent } from './hot-stuff/hot-stuff.component'
import { SearchComponent } from './search/search.component'
import { MovieComponent } from './movie/movie.component'

const routes: Routes = [
    { path: 'hot', component: HotStuffComponent },
    { path: 'search', component: SearchComponent },
    { path: 'details/:id', component: MovieComponent },
    { path: '', redirectTo: '/search', pathMatch: 'full' }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
