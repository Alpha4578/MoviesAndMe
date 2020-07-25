// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import {connect} from 'react-redux'
import FilmList from './FilmList'
import { SafeAreaView } from 'react-native-safe-area-context'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
    this.page = 0 // Compteur pour connaître la page courante
    this.totalPages = 0 // Nombre de pages totales pour savoir si on atteint la fin des retours de l'API TMBD
    this.state = {
      films: [],
      isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false
          })
      })
    }
}

  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
    // Contrôle du nombre de films sortants
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)

        this._loadFilms()
    })
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail",{ idFilm: idFilm })
}

  render() {
    console.log(this.state.isLoading)
    console.log(this.props)
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film...'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <FilmList
          film={this.state.film}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          />
          {this._displayLoading()}
        <FlatList
          data={this.state.films}
          extraData={this.props.favoriteFilms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
          <FilmItem
            film={item}
            // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
            isFavoriteFilm={(this.props.favoriteFilms.findIndex(film => film.id === item.id) !== -1) ? true : false}
            displayDetailForFilm={this._displayDetailForFilm}
          />
        }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {// On vérifie que l'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments}
               this._loadFilms()
              }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 5
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    borderRadius:10,
    borderColor: '#000000',
    backgroundColor: 'white',
    paddingLeft: 5, 
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5 
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.favoriteFilms
  }
}

export default connect(mapStateToProps)(Search)