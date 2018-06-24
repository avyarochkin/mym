import { Component, OnInit } from '@angular/core'
import { TMDBService, MultiSearchResult } from '../tmdb.service'

@Component({
    selector: 'app-hot-stuff',
    templateUrl: './hot-stuff.component.html',
    styleUrls: ['./hot-stuff.component.scss']
})
export class HotStuffComponent implements OnInit {

    constructor(private mdb: TMDBService) { }

    response: MultiSearchResult

    ngOnInit() {
        this.mdb.getPopularMovies().subscribe(response => this.response = response)
    }

}
