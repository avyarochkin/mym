import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core'
import { MovieRecord, TMDBService, MEDIA_TYPE } from '../tmdb.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-episode',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class EpisodeComponent implements OnInit, OnChanges {

    @Input() parentId: number
    @Input() seasonSeq: number
    @Input() episodeSeq: number
    readonly mediaType = MEDIA_TYPE.EPISODE

    movie: MovieRecord

    constructor(
        private mdb: TMDBService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.parentId = params['id']
            this.seasonSeq = params['season']
            this.episodeSeq = params['episode']
            this.loadEpisode()
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        this.loadEpisode()
    }

    loadEpisode() {
        if (this.parentId && this.seasonSeq && this.episodeSeq) {
            this.mdb.getEpisode(this.parentId, this.seasonSeq, this.episodeSeq).subscribe(episode => {
                this.movie = episode
            })
        }
    }
}
