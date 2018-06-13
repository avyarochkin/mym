import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

const BASE_URL = 'http://www.omdbapi.com/'
const API_KEY = '4023aa57'

export interface MdbTitle {
    Title: string
}

export interface Rating {
    Source: String,
    Value: String
}

export interface MdbMovie {
    imdbID: string,
    Title: string,
    Released: string,
    Season?: string,
    Episode?: string,
    Year?: string,
    Rated?: string,
    Runtime?: string,
    Genre?: string,
    Director?: string,
    Writer?: string,
    Actors?: string,
    Plot?: string,
    Language?: string,
    Country?: string,
    Awards?: string,
    Poster?: string,
    Ratings?: Rating[]
    Metascore?: string,
    imdbRating?: string,
    imdbVotes?: string,
    Type?: string,
    totalSeasons?: number,
    seasons?: MdbSeason[]
}

export interface MdbSeason {
    Title: string,
    Season: string,
    Episodes?: MdbMovie[]
}

interface MdbSearchResponse {
    Response: boolean,
    Search: MdbTitle[],
    totalResults: number
}


@Injectable({
    providedIn: 'root'
})
export class MdbService {

    constructor(private http: HttpClient) { }

    searchResults: MdbTitle[]
    totalNumber: number


    search(title: string): Observable<MdbSearchResponse> {

        const params = { apikey: API_KEY, s: title }

        return this.http.get<MdbSearchResponse>(`${BASE_URL}`, { params }).pipe(
            tap(response => {
                this.searchResults = response.Search
                this.totalNumber = response.totalResults ? response.totalResults : 0
            })
        )
    }


    getMovie(imdbID: string, season?: string, episode?: string): Observable<MdbMovie> {

        const params = { apikey: API_KEY, i: imdbID, plot: 'full' }
        
        if (season) params['Season'] = season
        if (episode) params['Episode'] = episode

        console.log(`Getting movie details for ${imdbID}/${season}/${episode}`)

        return this.http.get<MdbMovie>(`${BASE_URL}`, { params })
    }
}
