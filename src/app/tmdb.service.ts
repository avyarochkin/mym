import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

const BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY = '66d4305f8d77fcd22bd67d5ed8ad39af'

interface MediaRecord {
    id: number,
    overview: string,
    popularity?: number,
    poster_path?: string,
    backdrop_path?: string,
    vote_average?: number,
    vote_count?: number,
    genre_ids?: number[],
    original_language?: string
}
export interface Movie extends MediaRecord {
    media_type: 'movie',
    title: string,
    original_title?: string,
    release_date?: string,
    video: boolean,
    adult: boolean
}
export interface Series extends MediaRecord {
    media_type: 'tv',
    name: string,
    original_name?: string,
    first_air_date?: string,
    origin_country?: string[]
}
export interface Person {
    media_type: 'person',
    id: number,
    name: string,
    popularity?: number,
    profile_path?: string,
    known_for?: MediaRecord[],
    adult: boolean
}

export type SearchRecord = Movie|Series|Person

interface MultiSearchResult {
    page: number,
    results: SearchRecord[],
    total_results: number,
    total_pages: number
}

@Injectable({
    providedIn: 'root'
})
export class TMDBService {

    constructor(private http: HttpClient) { }

    result: MultiSearchResult

    search(query: string, page = 1): Observable<MultiSearchResult> {
        console.log(query)
        return this.http.get<MultiSearchResult>(`${BASE_URL}search/multi?api_key=${API_KEY}&page=${page}&query=${query}`).pipe(
            tap(response => this.result = response )
        )
    }
}
