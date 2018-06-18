import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MovieRecord, TMDBService } from '../tmdb.service'
import { Utils } from '../utils'

const NOT_AVAIL = 'N/A'

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnChanges {

    @Input() id: number

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
    
    // TODO - move to a pipe
    imagePath(localPath: string): string {
        return Utils.imagePath(localPath)
    }
    timeToHM(time: number): string {
        return Utils.timeToHM(time)
    }
}
