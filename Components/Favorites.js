// Components/Favorites.js

import React from 'react'
import FilmList from './FilmList'
import { connect } from 'react-redux'

class Favorites extends React.Component {

  render() {
    return (
      <FilmList
        films={this.props.favoriteFilms}
        navigation={this.props.navigation}
        favoriteList={true} // Ici on est bien dans le cas de la liste des films favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    favoriteFilms: state.favoriteFilms
  }
}

export default connect(mapStateToProps)(Favorites)