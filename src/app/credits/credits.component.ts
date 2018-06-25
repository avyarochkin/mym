import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { TMDBService, MovieCredits, MEDIA_TYPE } from '../tmdb.service'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-credits',
    templateUrl: './credits.component.html',
    styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnChanges {

    @Input() id: number
    @Input() mediaType: string
    @Input() season: number
    @Input() episode: number
    
    credits: MovieCredits

    contentOffset = 0
    
    private readonly scrollOffset = 125 * 3


    constructor(private mdb: TMDBService) { }

    ngOnChanges(changes: SimpleChanges) {
        this.loadCredits()
    }

    loadCredits() {
        const getCredits = (): Observable<MovieCredits> => {
            switch (this.mediaType) {
                case MEDIA_TYPE.MOVIE:
                    return this.mdb.getMovieCredits(this.id)
                case MEDIA_TYPE.SERIES:
                    return this.mdb.getSeriesCredits(this.id)
                case MEDIA_TYPE.SEASON:
                    return this.mdb.getSeasonCredits(this.id, this.season)
                case MEDIA_TYPE.EPISODE:
                    return this.mdb.getEpisodeCredits(this.id, this.season, this.episode)
                case MEDIA_TYPE.PERSON:
                    return this.mdb.getPersonCredits(this.id)
            }
        }
        getCredits().subscribe(credits => this.credits = credits)
    }

    // MARK - Scrolling

    canScrollBack() {
        return this.contentOffset < 0
    }

    scrollBack() {
        if (this.canScrollBack()) this.contentOffset += this.scrollOffset
    }

    canScrollForward() {
        return true
    }

    scrollForward() {
        if (this.canScrollForward()) this.contentOffset -= this.scrollOffset
    }

}
