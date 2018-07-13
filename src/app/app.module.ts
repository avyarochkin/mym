import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './auth-interceptor'
import { AppRoutingModule } from './app-routing.module'

import { MatTabsModule } from '@angular/material/tabs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatChipsModule } from '@angular/material/chips'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { AppComponent } from './app.component'
import { HotStuffComponent } from './hot-stuff/hot-stuff.component'
import { SearchComponent } from './search/search.component'
import { RecordsComponent } from './records/records.component'
import { MovieComponent } from './details/movie.component'
import { SeasonComponent } from './details/season.component'
import { PersonComponent } from './person/person.component'
import { SeriesComponent } from './details/series.component'
import { CreditsComponent } from './credits/credits.component'
import { EpisodeComponent } from './details/episode.component'
import { ImagePathPipe } from './image-path.pipe'
import { RuntimePipe } from './runtime.pipe'

@NgModule({
    declarations: [
        AppComponent,
        HotStuffComponent,
        SearchComponent,
        RecordsComponent,
        MovieComponent,
        SeasonComponent,
        PersonComponent,
        SeriesComponent,
        CreditsComponent,
        EpisodeComponent,
        ImagePathPipe,
        RuntimePipe
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
        MatToolbarModule,
        MatProgressSpinnerModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
