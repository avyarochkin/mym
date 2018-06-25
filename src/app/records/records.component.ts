import { Component, Input } from '@angular/core'
import { MediaRecord } from '../tmdb.service'

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss']
})
export class RecordsComponent {

    @Input() records: MediaRecord[]

    constructor() { }

    ratingHSL(rating: number): string {
        // 10 -> 260
        // 6 -> 60
        const hue = Math.max(Math.round(rating * 50 - 240), 60)
        // 6 -> 100
        // 0 -> 0
        const sat = Math.min(Math.round(rating * 100 / 6), 100)
        return `hsl(${hue},${sat}%,40%)`
    }
}
