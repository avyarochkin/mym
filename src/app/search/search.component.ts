import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { TMDBService } from '../tmdb.service'

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @ViewChild('searchInput') searchInput: ElementRef

    constructor(private mdb: TMDBService) { }

    ngOnInit() {
    }

    submitSearch(text: string) {
        console.log(`Submitting search for ${text}`)
        this.searchInput.nativeElement.blur()
        this.mdb.search(text).subscribe()
    }
}
