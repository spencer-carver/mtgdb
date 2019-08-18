function buildMatchRecord({
    dciNumber,
    opponentDciNumber,
    deckName,
    opponentDeckName,
    event,
    format,
    round,
    games,
    notes
}) {
    return {
        M: {
            opponentDciNumber: { N : `${ opponentDciNumber }` },
            deckName: { S: deckName },
            opponentDeckName: { S: opponentDeckName },
            event: { S: event },
            format: { S: format },
            round: { N: `${ round }` },
            games: { L: games.map(buildGameRecord) },
            notes: { S: notes || "N/A" }
        }
    };
}

function buildGameRecord({ onThePlay, result }) {
    return {
        M: {
            onThePlay: { BOOL: onThePlay },
            result: { S: result }
        }
    };
}

module.exports = buildMatchRecord;
