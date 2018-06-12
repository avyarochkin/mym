import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { MdbMovie, MdbService, MdbSeason } from '../mdb.service'

const NOT_AVAIL = 'N/A'

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnChanges {

    @Input() id: string
    @Input() season: string
    @Input() episode: string

    movie: MdbMovie
  
    constructor(private mdb: MdbService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.id) this.mdb.getMovie(this.id, this.season, this.episode)
            .subscribe(movie => {
                if (movie.Poster === NOT_AVAIL) {
                    movie.Poster = '/assets/images/poster.jpg'
                }
                this.movie = movie
            })
    }

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
