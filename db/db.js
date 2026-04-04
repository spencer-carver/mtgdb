const {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    QueryCommand,
    DeleteItemCommand
} = require("@aws-sdk/client-dynamodb");

const dynamo = new DynamoDBClient({ region: "us-east-1" });

async function insertItem(params) {
    console.log("inserting item", JSON.stringify(params));
    const command = new PutItemCommand(params);
    const response = await dynamo.send(command);
    return response.Attributes;
}

async function queryItem(params) {
    const command = new GetItemCommand(params);
    const response = await dynamo.send(command);
    return response.Item;
}

async function queryItems(params) {
    const command = new QueryCommand(params);
    const response = await dynamo.send(command);
    return response.Items;
}

// function updateItem() { }

async function deleteItem(params) {
    const command = new DeleteItemCommand(params);
    const response = await dynamo.send(command);
    return response.Attributes;
}

module.exports = {
    insertItem,
    queryItem,
    queryItems,
    /* updateItem, */
    deleteItem
};
