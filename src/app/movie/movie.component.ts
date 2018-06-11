import { Component, Input } from '@angular/core'
import { MdbMovie, MdbService, MdbSeason } from '../mdb.service'

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

    @Input() set id(id: string) {
        if (id) this.mdb.getMovie(id).subscribe(movie => this.movie = movie)
    }

    movie: MdbMovie
  
    constructor(private mdb: MdbService) { }

    getMovieSeasons(): MdbSeason[] {
        if (this.movie.totalSeasons) {
            if (!this.movie.seasons) {
                this.movie.seasons = []
                for (let i = 1; i <= this.movie.totalSeasons; i++) {
                    this.movie.seasons.push({ Season: i.toString(), Title: ''})
                }
            }
            return this.movie.seasons
        } else return []
    }
}
