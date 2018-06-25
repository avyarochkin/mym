import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

const BASE_URL = 'https://api.themoviedb.org/3/'

export type Url = string

export enum MEDIA_TYPE {
    MOVIE = 'movie',
    SERIES = 'tv',
    SEASON = 'season',
    EPISODE = 'episode',
    PERSON = 'person'
}

export interface MediaRecord {
    // common attributes
    id: number,
    media_type: MEDIA_TYPE,
    name: string,
    overview?: string,
    popularity?: number,
    poster_path?: Url,
    backdrop_path?: Url,
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
    profile_path?: Url,
    known_for?: MediaRecord[]
}

export interface MultiSearchResult {
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
    logo_path: Url,
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

export interface MovieRecord {
    adult: boolean,
    backdrop_path?: Url,
    belongs_to_collection?: any,
    budget: number,
    genres: Genre[],
    homepage?: Url,
    id: number,
    imdb_id?: string,
    original_language: string,
    original_title: string,
    overview?: string,
    popularity: number,
    poster_path?: Url,
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
    vote_count: number,
    // series attributes
    name: string,
    created_by: CrewMember[],
    episode_run_time: number[],
    first_air_date?: string,
    last_air_date?: string,
    in_production: boolean,
    languages: string[],
    networks: Company[],
    number_of_seasons: number,
    number_of_episodes: number,
    origin_country: string[],
    original_name?: string,
    seasons: Season[],
    type: string,
    // season attributes
    air_date?: string,
    episodes: Episode[],
    season_number: number
}

interface CastMember {
    id: number,
    name: string,
    gender?: number,
    character: string,
    order?: number,
    profile_path?: Url,
    cast_id?: number,
    credit_id?: string,
    // movie credits
    title?: string,
    original_title?: string,
    overview?: string,
    release_date?: string,
    vote_count?: number,
    vote_average?: number,
    genre_ids?: number[],
    original_language?: string,
    popularity?: number,
    poster_path?: Url,
    backdrop_path?: Url,
    video?: boolean,
    adult?: boolean
}

interface CrewMember {
    id: number,
    name: string,
    gender?: number,
    profile_path?: Url,
    department?: string,
    job?: string,
    credit_id?: string
}

export interface MovieCredits {
    id: number,
    cast: CastMember[],
    crew: CrewMember[]
}

export interface Season {
    id: number,
    name: string,
    season_number: number,
    air_date?: string,
    episode_count: number,
    overview?: string,
    poster_path?: Url
}

export interface Episode {
    id: number,
    name: string,
    episode_number: number,
    season_number: number,
    air_date?: string,
    overview?: string,
    crew: CrewMember[],
    guest_stars: CastMember[],
    production_code: string,
    still_path: Url,
    vote_average: number,
    vote_count: number
}

export interface PersonRecord {
    adult: boolean,
    also_known_as: any[],
    biography: string,
    birthday?: string,
    deathday?: string,
    gender: number,
    homepage?: Url,
    id: number,
    imdb_id: string,
    name: string
    place_of_birth?: string,
    popularity: number,
    profile_path?: Url
}

@Injectable({
    providedIn: 'root'
})
export class TMDBService {

    constructor(private http: HttpClient) { }

    searchText: string
    searchResult: MultiSearchResult

    search(query: string, page = 1): Observable<MultiSearchResult> {

        this.searchText = query
        return this.http.get<MultiSearchResult>(`${BASE_URL}search/multi?page=${page}&query=${query}`).pipe(
            tap(response => {
                this.searchResult = response
                console.log(`[search]:`, response)
            })
        )
    }

    // MARK - Movie

    getMovie(id: number): Observable<MovieRecord> {
        return this.http.get<MovieRecord>(`${BASE_URL}movie/${id}`).pipe(
            tap(response => console.log(`[getMovie]:`, response))
        )
    }

    getMovieCredits(id: number): Observable<MovieCredits> {
        return this.http.get<MovieCredits>(`${BASE_URL}movie/${id}/credits`).pipe(
            tap(response => console.log(`[getMovieCredits]:`, response))
        )
    }

    getPopularMovies(): Observable<MultiSearchResult> {
        return this.http.get<MultiSearchResult>(`${BASE_URL}movie/popular?page=1`).pipe(
            tap(response => console.log(`[getPopularMovies]:`, response))
        )
    }


    // MARK - Series

    getSeries(id: number): Observable<MovieRecord> {
        return this.http.get<MovieRecord>(`${BASE_URL}tv/${id}`).pipe(
            tap(response => console.log(`[getSeries]:`, response))
        )
    }

    getSeriesCredits(id: number): Observable<MovieCredits> {
        return this.http.get<MovieCredits>(`${BASE_URL}tv/${id}/credits`).pipe(
            tap(response => console.log(`[getSeriesCredits]:`, response))
        )
    }

    // MARK - Season

    getSeason(id: number, season: number): Observable<MovieRecord> {
        return this.http.get<MovieRecord>(`${BASE_URL}tv/${id}/season/${season}`).pipe(
            tap(response => console.log(`[getSeason]:`, response))
        )
    }

    getSeasonCredits(id: number, season: number): Observable<MovieCredits> {
        return this.http.get<MovieCredits>(`${BASE_URL}tv/${id}/season/${season}/credits`).pipe(
            tap(response => console.log(`[getSeasonCredits]:`, response))
        )
    }

    // MARK - Episode

    getEpisode(id: number, season: number, episode: number): Observable<MovieRecord> {
        return this.http.get<MovieRecord>(`${BASE_URL}tv/${id}/season/${season}/episode/${episode}`).pipe(
            tap(response => console.log(`[getEpisode]:`, response))
        )
    }

    getEpisodeCredits(id: number, season: number, episode: number): Observable<MovieCredits> {
        return this.http.get<MovieCredits>(`${BASE_URL}tv/${id}/season/${season}/episode/${episode}/credits`).pipe(
            tap(response => console.log(`[getEpisodeCredits]:`, response))
        )
    }

    // MARK - Person

    getPerson(id: number): Observable<PersonRecord> {
        return this.http.get<PersonRecord>(`${BASE_URL}person/${id}`).pipe(
            tap(response => console.log(`[getPerson]:`, response))
        )
    }

    getPersonCredits(id: number): Observable<MovieCredits> {
        return this.http.get<MovieCredits>(`${BASE_URL}person/${id}/movie_credits`).pipe(
            tap(response => console.log(`[getPersonCredits]:`, response))
        )
    }

}
