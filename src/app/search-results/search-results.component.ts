import { Component, OnInit } from '@angular/core'
import { TMDBService, MediaRecord } from '../tmdb.service'

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

    constructor(private mdb: TMDBService) { }

    get results(): MediaRecord[] {
        return this.mdb.searchResult ? this.mdb.searchResult.results : undefined
    }

    get totalNumber(): number {
        return this.mdb.searchResult ? this.mdb.searchResult.total_results : undefined
    }

    ngOnInit() {
    }

}
