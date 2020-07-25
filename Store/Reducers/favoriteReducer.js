//Store/Reducers/favoriteReducer.js

const initialState = { favoriteFilms: [] }

function toogleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoriteFilms.findIndex(item => item.id === 
action.value.id)
            console.log('favoriteFilmIndex value: ' +favoriteFilmIndex)
            if (favoriteFilmIndex !== -1) {
            console.log('This film is in the favorite film list')
                // le film est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    favoriteFilms: state.favoriteFilms.filter( (item, index) => index !== favoriteFilmIndex)
                }
            }
            else {
            console.log('This film is NOT in the favorite film list')
                // Le film n'est pas dans les favoris, on l'ajoute à la liste
                nextState = {
                    favoriteFilms: [...state.favoriteFilms, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}


export default toogleFavorite