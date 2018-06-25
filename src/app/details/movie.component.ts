import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MovieRecord, TMDBService, MEDIA_TYPE } from '../tmdb.service'

const NOT_AVAIL = 'N/A'

@Component({
    selector: 'app-movie',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class MovieComponent implements OnInit, OnChanges {

    @Input() id: number
    readonly mediaType = MEDIA_TYPE.MOVIE

    movie: MovieRecord
  
    constructor(
        private mdb: TMDBService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id']
            this.loadMovie()
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadMovie()
    }

    private loadMovie() {
        this.mdb.getMovie(this.id).subscribe(movie => {
            movie.name = movie.title
            movie.original_name = movie.original_title
            this.movie = movie
        })
    }
}
