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
        return this.mdb.result ? this.mdb.result.results : undefined
    }

    get totalNumber(): number {
        return this.mdb.result ? this.mdb.result.total_results : undefined
    }

    ngOnInit() {
    }

    iconForMediaType(mediaType: string): string {
        const icon = {'movie': 'videocam', 'tv': 'live_tv', 'person': 'person'}[mediaType]
        return icon ? icon : 'error_outline'
    }
}
