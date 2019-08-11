const aggregateStatsDB = require("../utils/aggregateStatsDB");
const buildStats = require("../utils/buildStats");
const formatOutput = require("../utils/formatOutput");

async function addMatchResult({ dciNumber, deckName, opponentDeckName, games }) {
    try {
        const existingRecord = await aggregateStatsDB.queryItem(dciNumber, deckName);

        const formattedResult = buildStats({
            existingRecord: existingRecord ? existingRecord.records.M : undefined,
            deckName: opponentDeckName,
            gameResults: games
        });

        await aggregateStatsDB.insertItem(dciNumber, deckName, formattedResult);

        return {
            success: true,
            stats: formatOutput({ stats: formattedResult })
        };
    } catch (error) {
        console.log("addMatchResult Error", error);

        throw error;
    }
}

module.exports = addMatchResult;
