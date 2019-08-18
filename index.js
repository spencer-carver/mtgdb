const getAllStats = require("./commands/getAllStats");
const getStatsForDeck = require("./commands/getStatsforDeck");
const addMatchResult = require("./commands/addMatchResult");
const enforceAuth = require("./enforceAuth");

const COMMANDS = {
    getAllStats,
    getStatsForDeck,
    addMatchResult
};

function unknownCommandHandler() {
    console.log("invalidCommand Error");

    const invalidCommand = new Error("Invalid Command");
    invalidCommand.status = 404;

    throw invalidCommand;
}

exports.handler = async (event, context) => {
    try {
        enforceAuth(event, context); // security through obscurity

        const eventBody = typeof event.body === "string"
            ? JSON.parse(event.body)
            : event.body;

        const command = COMMANDS[eventBody.command] || unknownCommandHandler();

        const responseBody = await command(eventBody);

        return {
            isBase64Encoded: false,
            statusCode: 200,
            headers: {},
            body: JSON.stringify(responseBody)
        };
    } catch (error) {
        return {
            isBase64Encoded: false,
            statusCode: error.status || 500,
            headers: {},
            body: JSON.stringify({
                success: false,
                errorMessage: error
            })
        }
    }
};
