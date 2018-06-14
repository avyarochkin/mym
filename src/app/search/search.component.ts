import { Component, OnInit } from '@angular/core'
import { TMDBService } from '../tmdb.service'

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    constructor(private mdb: TMDBService) { }

    ngOnInit() {
    }

    submitSearch(text: string) {
        console.log(`Submitting search for ${text}`)
        this.mdb.search(text).subscribe()
    }
}
