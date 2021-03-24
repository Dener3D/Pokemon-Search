import styles from '../styles/components/PokemonList.module.css'

export default function pokemonList({ pokemon }){

    return (
        <div className={styles.mainContainer}>
          {pokemon.map(p => (
            <div className={styles.pokemonCard} key={p.name} >
            <img src= {"https://pokeres.bastionbot.org/images/pokemon/" + p.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '') + ".png"} alt={p.name}/>
            <p className={styles.nameText}>{p.name}</p>
             </div>
          ))}
        </div>
    )
}