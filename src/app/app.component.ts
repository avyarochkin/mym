import { Component } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'myMoves'

    navLinks = [
        { label: 'Home', path: '/hot' },
        { label: 'Search', path: '/search' }
    ]
  
}
