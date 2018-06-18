import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core'
import { TMDBService, MovieRecord } from '../tmdb.service'
import { ActivatedRoute } from '@angular/router'
import { Utils } from '../utils'

@Component({
    selector: 'app-season',
    templateUrl: '../movie/movie.component.html',
    styleUrls: ['../movie/movie.component.scss']
})
export class SeasonComponent implements OnInit, OnChanges {

    @Input() parentId: number
    @Input() seasonSeq: number

    movie: MovieRecord

    constructor(
        private mdb: TMDBService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.parentId = params['id']
            this.seasonSeq = params['season']
            this.loadSeason()
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadSeason()
    }

    loadSeason() {
        if (this.parentId && this.seasonSeq) {
            this.mdb.getSeason(this.parentId, this.seasonSeq).subscribe(season => {
                this.movie = season
            })
        }
    }

    // TODO - move to a pipe
    imagePath(localPath: string): string {
        return Utils.imagePath(localPath)
    }
    timeToHM(time: number): string {
        return Utils.timeToHM(time)
    }
    
}
