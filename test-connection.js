const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://comar:Premio1968@siif0.ot7djn6.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Conexión exitosa con MongoDB Atlas usando MongoClient");
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
  } finally {
    await client.close();
  }
}

run();
