import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MovieRecord, TMDBService } from '../tmdb.service'

const NOT_AVAIL = 'N/A'

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnChanges {

    @Input() id: number
    @Input() season: string
    @Input() episode: string

    movie: MovieRecord
  
    constructor(
        private mdb: TMDBService,
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
        this.mdb.getMovie(this.id).subscribe(movie => this.movie = movie)
    }

    imagePath(localPath: string): string {
        return this.mdb.imagePath(localPath)
    }

    timeToHM(time: number): string {
        const hr = Math.trunc(time / 60)
        const m = time - hr * 60
        return (hr > 0 ? `${hr} hr ` : '') + (m > 0 ? `${m} min` : '')
    }
}
