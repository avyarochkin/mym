import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core'
import { MovieRecord, TMDBService } from '../tmdb.service'
import { ActivatedRoute } from '@angular/router'
import { Utils } from '../utils'

@Component({
    selector: 'app-episode',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class EpisodeComponent implements OnInit, OnChanges {

    @Input() parentId: number
    @Input() seasonSeq: number
    @Input() episodeSeq: number

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

    // TODO - move to a pipe
    imagePath(localPath: string): string {
        return Utils.imagePath(localPath)
    }
    timeToHM(time: number): string {
        return Utils.timeToHM(time)
    }
    
}
