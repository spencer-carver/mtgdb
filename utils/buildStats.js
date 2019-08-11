const buildMatchStats = require("./buildMatchStats");

function buildStats({ existingRecord = {}, deckName, gameResults = [] }) {
    const record = existingRecord;
    const numberOfGames = gameResults.length;

    record[deckName] = { M: buildMatchStats({
        existingMatchRecord: existingRecord[deckName] ? existingRecord[deckName].M : undefined,
        game1: numberOfGames >= 1 ? gameResults[0] : undefined,
        game2: numberOfGames >= 2 ? gameResults[1] : undefined,
        game3: numberOfGames >= 3 ? gameResults[2] : undefined
    }) };

    return record;
}

module.exports = buildStats;
