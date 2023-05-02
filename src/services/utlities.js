export function getFavs() {
    const favs = localStorage.getItem('favs')
    if (favs) {
        try {
            return JSON.parse(favs)
        }
        catch {
            return []
        }
    }
    return []
}
export function getPackages() {
    const packages = localStorage.getItem('packages')
    if (packages) {
        try {
            return JSON.parse(packages)
        }
        catch {
            return []
        }
    }
    return []
}