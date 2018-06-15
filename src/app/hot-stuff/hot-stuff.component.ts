import { Component, OnInit } from '@angular/core'
import { MediaRecord, TMDBService } from '../tmdb.service'

@Component({
    selector: 'app-hot-stuff',
    templateUrl: './hot-stuff.component.html',
    styleUrls: ['./hot-stuff.component.scss']
})
export class HotStuffComponent implements OnInit {

    constructor(private mdb: TMDBService) { }

    movies: MediaRecord[]

    ngOnInit() {
        this.mdb.getPopularMovies().subscribe(movies => this.movies = movies)
    }

}
