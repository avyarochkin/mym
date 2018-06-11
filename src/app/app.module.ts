import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { HotStuffComponent } from './hot-stuff/hot-stuff.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MovieComponent } from './movie/movie.component';
import { SeasonComponent } from './season/season.component'

@NgModule({
  declarations: [
    AppComponent,
    HotStuffComponent,
    SearchComponent,
    SearchResultsComponent,
    MovieComponent,
    SeasonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
