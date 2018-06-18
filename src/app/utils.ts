export module Utils {

    export function imagePath(localPath: string): string {
        if (localPath) {
            return `http://image.tmdb.org/t/p/original/${localPath}`
        } else {
            return '/assets/images/poster.jpg'
        }
    }

    export function timeToHM(time: number): string {
        const hr = Math.trunc(time / 60)
        const m = time - hr * 60
        return (hr > 0 ? `${hr} hr ` : '') + (m > 0 ? `${m} min` : '')
    }    
}
