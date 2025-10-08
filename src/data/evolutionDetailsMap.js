

export const evolutionDetailsMap = {
    gender: { label: 'Genre', format: (v) => (v === 0 ? 'male' : v === 1 ? 'female' : '') },
    held_item: { label: 'Needs item', format: (v) => v?.name },
    item: { label: 'Item', format: (v) => v?.name },
    known_move: { label: 'Move', format: (v) => v?.name },
    known_move_type: { label: 'Move type', format: (v) => v?.name },
    location: { label: 'Location', format: (v) => v?.name },
    min_affection: { label: 'Min level affection' },
    min_beauty: { label: 'Min level beauty' },
    min_happiness: { label: 'Min level happiness' },
    min_level: { label: 'Min level' },
    needs_overworld_rain: { label: 'Needs rain', format: (v) => (v ? 'Yes' : '') },
    party_species: { label: 'Party species', format: (v) => v?.name },
    party_type: { label: 'Party type', format: (v) => v?.name },
    relative_physical_stats: { label: 'Physical stats' },
    time_of_day: { label: 'Time of day' },
    trade_species: { label: 'Trade species', format: (v) => v?.name },
    trigger: { label: 'Trigger', format: (v) => v?.name },
    turn_upside_down: { label: 'Turn upside down', format: (v) => (v ? 'Yes' : '') },
};