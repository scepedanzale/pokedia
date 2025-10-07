import PokemonList from "../components/pokemon/PokemonList";

export default function HomePage() {
  return (
    <section>
      <PokemonList limit={50}/>
    </section>
  )
}
