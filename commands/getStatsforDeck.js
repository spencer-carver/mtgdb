const aggregateStatsDB = require("../db/aggregateStatsDB");
const formatOutput = require("../utils/formatOutput");

async function getStatsForDeck({ dciNumber, deckName }) {
    try {
        const stats = await aggregateStatsDB.queryItem(dciNumber, deckName);

        return {
            success: true,
            stats: formatOutput({ stats: stats ? stats.records.M : undefined })
        };
    } catch (error) {
        console.log("getStatsForDeck Error", error);

        throw error;
    }
}

module.exports = getStatsForDeck;
