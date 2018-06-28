import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'imagePath'
})
export class ImagePathPipe implements PipeTransform {

    /**
     * Expand the local image path to a full path
     *
     * @param {string} value local path value
     * @param {string} [size] requested image size ("original" if not specified)
     * @param {string} [wrapper] css wrapper e.g. "url()"
     * @returns {string}
     * @memberof ImagePathPipe
     */
    transform(value: string, size = 'original', wrapper?: string): string {
        let path = (value)
            ? `http://image.tmdb.org/t/p/${size}${value}`
            : '/assets/images/poster.png'
        if (wrapper) { path = `${wrapper}('${path}')` }
        return path
    }
}
