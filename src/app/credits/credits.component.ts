import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { TMDBService, MovieCredits } from '../tmdb.service'

@Component({
    selector: 'app-credits',
    templateUrl: './credits.component.html',
    styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnChanges {

    @Input() id: number
    
    credits: MovieCredits

    contentOffset = 0
    
    private readonly scrollOffset = 110


    constructor(private mdb: TMDBService) { }

    ngOnChanges(changes: SimpleChanges) {
        this.loadCredits()
    }

    loadCredits() {
        this.mdb.getMovieCredits(this.id).subscribe(credits => this.credits = credits)
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

    imagePath(localPath: string): string {
        return this.mdb.imagePath(localPath)
    }

}
