export const movieUrl = 'https://api.themoviedb.org/3/search/movie?api_key=a13e89f6f7d5a406c0fdd220bfb6bde5&query=return'

export async function getMovies(url: string){
    const movies =  fetch(url).then(res=> res.json())

    return movies
}
