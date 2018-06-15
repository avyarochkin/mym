import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

const BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY = '66d4305f8d77fcd22bd67d5ed8ad39af'

export interface MediaRecord {
    // common attributes
    id: number,
    media_type: 'movie'|'tv'|'person',
    name: string,
    overview?: string,
    popularity?: number,
    poster_path?: string,
    backdrop_path?: string,
    vote_average?: number,
    vote_count?: number,
    genre_ids?: number[],
    original_language?: string,
    adult?: boolean,
    // movie attributes
    title?: string,
    original_title?: string,
    release_date?: string,
    video?: boolean,
    // tv attributes
    original_name?: string,
    first_air_date?: string,
    origin_country?: string[],
    // person attributes
    profile_path?: string,
    known_for?: MediaRecord[]
}

interface MultiSearchResult {
    page: number,
    results: MediaRecord[],
    total_results: number,
    total_pages: number
}

interface Genre {
    id: number,
    name: string
}

interface Company {
    id: string,
    logo_path: string,
    name: string,
    origin_country: string
}

interface Country {
    iso_3166_1: string,
    name: string
}

interface Language {
    iso_639_1: string,
    name: string
}

interface MovieRecord {
    adult: boolean,
    backdrop_path?: string,
    belongs_to_collection?: any,
    budget: number,
    genres: Genre[],
    homepage?: string,
    id: number,
    imdb_id?: string,
    original_language: string,
    original_title: string,
    overview?: string,
    popularity: number,
    poster_path?: string,
    production_companies: Company[],
    production_countries: Country[],
    release_date: string,
    revenue: number,
    runtime?: number,
    spoken_languages: Language[],
    status: string,
    tagline?: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

interface CastMember {
    cast_id: number,
    character: string,
    credit_id: string,
    gender?: number,
    id: number,
    name: string,
    order: number,
    profile_path?: string
}

interface CrewMember {
    credit_id: string,
    department: string,
    gender?: number,
    id: number,
    job: string,
    name: string,
    profile_path?: string
}

interface MovieCredits {
    id: number,
    cast: CastMember[],
    crew: CrewMember[]
}

interface PersonRecord {
    adult: boolean,
    also_known_as: any[],
    biography: string,
    birthday?: string,
    deathday?: string,
    gender: number,
    homepage?: string,
    id: number,
    imdb_id: string,
    name: string
    place_of_birth?: string,
    popularity: number,
    profile_path?: string
}

@Injectable({
    providedIn: 'root'
})
export class TMDBService {

    constructor(private http: HttpClient) { }

    result: MultiSearchResult

    search(query: string, page = 1): Observable<MultiSearchResult> {

        return this.http.get<MultiSearchResult>(`${BASE_URL}search/multi?api_key=${API_KEY}&page=${page}&query=${query}`).pipe(
            map(response => {
                response.results = response.results.map(record => {
                    if (record.media_type === 'movie') record.name = record.title
                    return record
                })
                return response
            }),
            tap(response => this.result = response )
        )
    }

    // MARK - Movie

    getPopularMovies(): Observable<MediaRecord[]> {

        return this.http.get<MultiSearchResult>(`${BASE_URL}movie/popular?api_key=${API_KEY}&page=1`).pipe(
            map(response => response.results)
        )
    }

    getMovie(id: number): Observable<MovieRecord> {
        return this.http.get<MovieRecord>(`${BASE_URL}movie/${id}?api_key=${API_KEY}`)
    }

    getMovieCredits(id: number): Observable<MovieCredits> {
        return this.http.get<MovieCredits>(`${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`)
    }

    // MARK - Person

    getPerson(id: number): Observable<PersonRecord> {
        return this.http.get<PersonRecord>(`${BASE_URL}person/${id}?api_key=${API_KEY}`)
    }
}
