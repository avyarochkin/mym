import { Component, OnInit, Input } from '@angular/core'
import { MdbSeason, MdbService } from '../mdb.service'

@Component({
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {

    _parentId: string
    _seasonSeq: string

    @Input() set parentId(parentId: string) {
        this._parentId = parentId
        this.getSeason()
    }

    @Input() set seasonSeq(seasonSeq: string) {
        this._seasonSeq = seasonSeq
        this.getSeason()
    }

    season: MdbSeason

    constructor(private mdb: MdbService) { }

    ngOnInit() {
    }

    getSeason() {
        if (this._parentId && this._seasonSeq) {
            this.mdb.getMovie(this._parentId, this._seasonSeq)
                .subscribe(movie => {
                    this.season = movie as MdbSeason
                })
        }
    }
}
