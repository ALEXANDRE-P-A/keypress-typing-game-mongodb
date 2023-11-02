const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://atoviag:safada42@cluster0.kbno8nb.mongodb.net/suppier_information?retryWrites=true&w=majority",
  {
    serverApi: ServerApiVersion.v1
  }
);

const getCollection = async _ => {
  try{
    await client.connect();
    const db = client.db("typing_game_texts");
    return db.collection("collection1");
  }catch(err){
    await client.close();
    console.log(err);
  }
};

const getTexts = async _ => {
  const col = await getCollection();
  const cursor = col.find({ category: "mixed" });
  const result = await cursor.toArray();
  await client.close();
  return result;
};

module.exports = { getTexts };