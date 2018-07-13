import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'runtime'
})
export class RuntimePipe implements PipeTransform {

    /**
     * Convert the number of minutes to a string "x hr y min"
     *
     * @param {number} minutes number of minutes to convert
     * @returns {string}
     * @memberof RuntimePipe
     */
    transform(minutes: number): string {
        const hr = Math.trunc(minutes / 60)
        const m = minutes - hr * 60
        return (hr > 0 ? `${hr}h ` : '') + (m > 0 ? `${m}m` : '')
        // return `${hr}:${m}`
    }

}
