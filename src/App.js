import React, { useState, useEffect } from 'react'
import PokemonList from './components/PokemonList'
import Pagination from './components/Pagination'

import axios from 'axios'

import styles from './styles/pages/global.module.css'

function App() {
  const [search, setSearch] = useState("")
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [filteredPokemons, setFilteredPokemons] = useState()
  

  useEffect(() => {
    setLoading(true)
    const params = {};
    if (search) {
      params.name = search;
    }

    let cancel
    axios.get(currentPageUrl + "/" + search, {
      
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      //setPokemon(res.data.results.map(p => p))
      setPokemon(res.data.results)
    })
      .catch(err => console.log(err))

    return () => cancel()
  }, [currentPageUrl])

  useEffect(() => {
    setFilteredPokemons(
      pokemon.filter(pok => {
        return pok.name.toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [pokemon, search])


  

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  return (
    <>
    <div className={styles.main}>
    <div className = {styles.searchContainer}>
    <input 
    type="text" 
    value={search}
    placeholder="Search Pokemon"
    onChange={event => setSearch(event.target.value)} />
    </div>
    <PokemonList pokemon={filteredPokemons} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </div>
    </>
  );
}

export default App;
