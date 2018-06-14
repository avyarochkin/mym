import { Component, OnInit } from '@angular/core'
import { MdbService, MdbTitle } from '../mdb.service'

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

    constructor(private mdb: MdbService) { }

    get results(): MdbTitle[] {
        return this.mdb.searchResults
    }

    get totalNumber(): number {
        return this.mdb.totalNumber
    }

    ngOnInit() {
    }

}
