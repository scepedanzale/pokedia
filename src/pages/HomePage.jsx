import Wrapper from "../components/layout/Wrapper";
import PokemonList from "../components/pokemon/PokemonList";

export default function HomePage() {

    return (
        <>
            <Wrapper>
                <h1>Welcome to PokédiA</h1>
                <p>Explore the Pokémon World!</p>
                <PokemonList pageLimit={50} totalResults={10000} />
            </Wrapper>
        </>
    )
}
