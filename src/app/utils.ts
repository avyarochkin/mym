export module Utils {

    export function imagePath(localPath: string, wrapper?: string): string {
        const path = (localPath)
            ? `http://image.tmdb.org/t/p/original/${localPath}`
            : '/assets/images/poster.jpg'
    
        return wrapper ? `${wrapper}('${path}')` : path
    }

    export function timeToHM(time: number): string {
        const hr = Math.trunc(time / 60)
        const m = time - hr * 60
        return (hr > 0 ? `${hr} hr ` : '') + (m > 0 ? `${m} min` : '')
    }    
}
