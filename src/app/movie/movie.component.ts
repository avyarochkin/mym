import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { MdbMovie, MdbService, MdbSeason } from '../mdb.service'
import { ActivatedRoute } from '@angular/router'

const NOT_AVAIL = 'N/A'

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnChanges {

    @Input() id: string
    @Input() season: string
    @Input() episode: string

    movie: MdbMovie
  
    constructor(
        private mdb: MdbService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id']
            this.season = params['season']
            this.episode = params['episode']
            this.loadMovie()
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadMovie()
    }

    private loadMovie() {
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
