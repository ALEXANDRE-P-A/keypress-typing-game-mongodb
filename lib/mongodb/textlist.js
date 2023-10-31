const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI,{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

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
  console.log(result);
  await client.close();
  return result;
};

module.exports = { getTexts };