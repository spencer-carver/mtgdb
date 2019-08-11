const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB();

const DATABASE = {
    tableName: "mtgAggregate",
    partitionKey: "dciNumber",
    sortKey: "deck",
    value: "records"
};

function generateParams(dciNumber, deckName, record) {
    const QUERY_TYPE = record ? "Item" : "Key";

    const params = {
        [QUERY_TYPE]: {
            [DATABASE.partitionKey]: { N: `${ dciNumber }` },
            [DATABASE.sortKey]: { S: deckName }
        },
        TableName: DATABASE.tableName
    };

    if (record) {
        params[QUERY_TYPE][DATABASE.value] = { M: record };
    }

    return params;
}

async function insertItem(dciNumber, deckName, record) {
    console.log("inserting record", JSON.stringify(record));
    return new Promise(function(resolve, reject) {
        dynamo.putItem(generateParams(dciNumber, deckName, record), function (err, data) {
            if (err) {
                return reject(err);
            }
    
            return resolve(data.Item);
        });
    });
}

async function queryItem(dciNumber, deckName) {
    return new Promise(function(resolve, reject) {
        dynamo.getItem(generateParams(dciNumber, deckName), function (err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Item);
        });
    });
}

async function queryItems(dciNumber) {
    const params = {
        ExpressionAttributeValues: {
            ":partitionkeyval": { N: `${ dciNumber }` }
        },
        KeyConditionExpression: "dciNumber = :partitionkeyval",
        TableName: DATABASE.tableName
    };

    return new Promise(function(resolve, reject) {
        dynamo.query(params, function(err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Items);
        });
    });
}

// function updateItem() { }

async function deleteItem(dciNumber, deckName) {
    return new Promise(function(resolve, reject) {
        dynamo.deleteItem(generateParams(dciNumber, deckName), function (err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Item);
        });
    });
}

module.exports = {
    insertItem,
    queryItem,
    queryItems,
    /* updateItem, */
    deleteItem
};
