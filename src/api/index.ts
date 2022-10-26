export const baseURL = 'https://blog.kata.academy/api/'

export async function getArticles(offset: number){
    try {
        const response = await fetch(`${baseURL}/articles?limit=5&offset=${offset}`)
        const data = await response.json()
        return data
    } catch (e){
        console.log(e)
    }
}
