import { Component, OnInit, Input } from '@angular/core'
import { TMDBService, MovieRecord } from '../tmdb.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

    @Input() id: number

    series: MovieRecord
    
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
        this.mdb.getSeries(this.id).subscribe(series => this.series = series)
    }
}
