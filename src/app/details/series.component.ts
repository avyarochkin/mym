import { Component, OnInit, Input } from '@angular/core'
import { TMDBService, MovieRecord, MEDIA_TYPE } from '../tmdb.service'
import { ActivatedRoute } from '@angular/router'
import { Utils } from '../utils'

@Component({
    selector: 'app-series',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class SeriesComponent implements OnInit {

    @Input() id: number
    readonly mediaType = MEDIA_TYPE.SERIES

    movie: MovieRecord

    constructor(
        private mdb: TMDBService,
        private route: ActivatedRoute

    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id']
            this.loadSeries()
        })
    }

    loadSeries() {
        this.mdb.getSeries(this.id).subscribe(series => {
            this.movie = series
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
