const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri.js");

console.log(uri);

const client =  new MongoClient(uri);
const dbname = "AccuCount";

const connectToDatabase = async () => {
    try{
        await client.connect();
        console.log(`Successfully connected to the ${dbname} database`);
    } catch (e) {
        console.error(`Error connecting to the database: ${e}`);
    } 
};

const main = async () => {
    try{
        await connectToDatabase();
    } catch (e) {
        console.error(`Error connecting to the database: ${e}`);
    } finally {
        await client.close();
    }
}

async function listDatabases(client)    {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(element => {
        console.log(`- ${element.name}`);
    });
}

//Run the function
main();