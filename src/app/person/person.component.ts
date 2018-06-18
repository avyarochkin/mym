import { Component, OnInit, Input } from '@angular/core'
import { PersonRecord, TMDBService } from '../tmdb.service'
import { ActivatedRoute } from '@angular/router'
import { Utils } from '../utils'

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

    @Input() id: number

    person: PersonRecord

    constructor(
        private mdb: TMDBService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id']
            this.loadPerson()
        })
    }

    loadPerson() {
        this.mdb.getPerson(this.id).subscribe(person => this.person = person)
    }

    // TODO - move to a pipe
    imagePath(localPath: string): string {
        return Utils.imagePath(localPath)
    }
    timeToHM(time: number): string {
        return Utils.timeToHM(time)
    }
}
