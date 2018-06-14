import { Component, OnInit } from '@angular/core'
import { TMDBService, SearchRecord } from '../tmdb.service'

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

    constructor(private mdb: TMDBService) { }

    get results(): SearchRecord[] {
        return this.mdb.result ? this.mdb.result.results : undefined
    }

    get totalNumber(): number {
        return this.mdb.result ? this.mdb.result.total_results : undefined
    }

    ngOnInit() {
    }

}
