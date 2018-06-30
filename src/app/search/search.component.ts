import { Component, ViewChild, ElementRef } from '@angular/core'
import { TMDBService, MultiSearchResult } from '../tmdb.service'

const EMPTY_IMAGES_COUNT = 32

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    @ViewChild('searchInput') searchInput: ElementRef

    emptyIndex = Math.trunc(Math.random() * EMPTY_IMAGES_COUNT) + 1

    get searchText(): string {
        return this.mdb.searchText
    }
    set searchText(value: string) {
        this.mdb.searchText = value
    }

    response: MultiSearchResult

    constructor(private mdb: TMDBService) { }

    submitSearch(text: string) {
        console.log(`Submitting search for ${text}`)
        this.searchInput.nativeElement.blur()
        this.mdb.search(text).subscribe(response => this.response = response)
    }
}
