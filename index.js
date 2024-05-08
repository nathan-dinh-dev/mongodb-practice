const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://nathanxdinhx97:${process.env.MONGODB_PASSWORD}@cluster0.nghtjin.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    //Uncomment this to list all list db
    // await listDatabases(client);

    //Uncomment this to creat listing
    // await createListing(client, {
    //   name: "Lovely Loft",
    //   summary: "Acharming loft in Paris",
    //   bedroom: 1,
    //   bathroom: 1,
    // });

    //Uncomment this to read db
    // await findOneListingByName(client, "Infinite Views");

    //Uncomment this to test update method
    // await updateListingByName(client, "Infinite Views", {
    //   bedrooms: 6,
    //   beds: 8,
    // });

    //This is for delete testing
    await deleteListingByName(client, "Cozy Cottage");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Create
async function createListing(client, newListing) {
  const result = client
    .db("sample_airbnb")
    .collection("listingAndReviews")
    .insertOne(newListing);
  console.log(result);
}

//Read
async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingAndReviews")
    .findOne();
  if (result) {
    console.log("Found!");
  } else {
    console.log("Not Found!");
  }
}

//Update
async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingAndReviews")
    .updateOne({ name: nameOfListing }, { $set: updatedListing });

  if (result) console.log("Success");
  else console.log("Not updated");
}

//Delete
async function deleteListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingAndReviews")
    .deleteOne({ name: nameOfListing });

  if (result) {
    console.log("Delete Successfully");
  } else console.log("Failed to Delete");
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases: ");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
