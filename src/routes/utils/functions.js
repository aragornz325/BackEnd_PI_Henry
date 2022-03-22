
let pageMap = (e) =>{
    return {
    name: e.name,
    genres: e.genres.map((e) => {
        return {
            id: e.id,
            name: e.name
        }
    }),
    released: e.released,
    rating: e.rating,
    description: e.description,
    platforms: e.platforms.map((e) =>  e.platform.name),
    image: e.background_image,
    createdInDb: e.createdInDb = false,
    id: e.id,
};
}

module.exports = {
    pageMap
}