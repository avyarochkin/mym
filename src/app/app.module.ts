import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'

import { MatTabsModule } from '@angular/material/tabs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatChipsModule } from '@angular/material/chips'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { AppComponent } from './app.component'
import { HotStuffComponent } from './hot-stuff/hot-stuff.component'
import { SearchComponent } from './search/search.component'
import { SearchResultsComponent } from './search-results/search-results.component'
import { MovieComponent } from './details/movie.component'
import { SeasonComponent } from './details/season.component'
import { PersonComponent } from './person/person.component'
import { SeriesComponent } from './details/series.component'
import { CreditsComponent } from './credits/credits.component'
import { EpisodeComponent } from './details/episode.component'

@NgModule({
    declarations: [
        AppComponent,
        HotStuffComponent,
        SearchComponent,
        SearchResultsComponent,
        MovieComponent,
        SeasonComponent,
        PersonComponent,
        SeriesComponent,
        CreditsComponent,
        EpisodeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatChipsModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
