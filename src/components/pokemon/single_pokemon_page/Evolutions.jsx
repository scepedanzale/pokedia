import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleEvolution from './SingleEvolution';

export default function Evolutions({ currentPokemon }) {
    const [evolutionsUrl, setEvolutionsUrl] = useState([]);

    const fetchEvolutionChain = async (evolutionChainUrl) => {
        try {
            const response = await axios(evolutionChainUrl);
            return response.data.chain;
        } catch (error) {
            console.error('Errore durante il fetch della catena evolutiva:', error);
            return null;
        }
    };

    const fetchEvolutionSpecie = async () => {
        try {
            const response = await axios(currentPokemon?.species?.url);
            return response.data.evolution_chain.url;
        } catch (error) {
            console.error('Errore durante il fetch della specie:', error);
            return null;
        }
    };

    const evolutionController = (evolutionChain) => {
        const traverse = (node) => {
            if (!node || !node.species) return [];

            const current = {
                evolution_details: node.evolution_details?.[0] || null,
                name: node.species.name,
            };

            const children = Array.isArray(node.evolves_to)
                ? node.evolves_to.flatMap(traverse)
                : [];

            return [current, ...children];
        };

        return Array.isArray(evolutionChain)
            ? evolutionChain.flatMap(traverse)
            : [];
    };

    useEffect(() => {
        const fetchEvolutionsUrl = async () => {
            try {
                const evolutionChainUrl = await fetchEvolutionSpecie();
                if (!evolutionChainUrl) return;

                const evolutionChain = await fetchEvolutionChain(evolutionChainUrl);
                if (!evolutionChain || !evolutionChain.evolves_to) return;

                const allEvolutions = evolutionController(evolutionChain.evolves_to);

                setEvolutionsUrl([
                    {
                        evolution_details: evolutionChain?.evolution_details?.[0] || null,
                        name: evolutionChain.species.name,
                    },
                    ...allEvolutions,
                ]);
            } catch (error) {
                console.error('Errore durante il fetch completo della catena evolutiva:', error);
            }
        };

        if (currentPokemon) {
            fetchEvolutionsUrl();
        }
    }, [currentPokemon]);

    return (
        <section id='evolutions-container'>
            <h2>Evolutions</h2>
            <div id='evolutions'>
                {evolutionsUrl && evolutionsUrl.map((evolution, index) => (
                    <SingleEvolution
                        key={index}
                        evolution={evolution}
                        currentPokemonName={currentPokemon?.name}
                        numEvolution={evolutionsUrl.length}
                    />
                ))}
            </div>
        </section>
    );
}
