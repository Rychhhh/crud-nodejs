const { ObjectID } = require("bson");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "web-han";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    console.log("Gagal Terhubung");
  }

  // Pilih database
  const db = client.db(dbName);

  // ------------------------------------ (One) Insert atau menambahkan collection pada student
  db.collection("student").insertOne(
    {
      nama: "Michelle",
      nis: 12008080,
    },
    (error, result) => {
      if (error) {
        return console.log("Data Gagal Ditambahkan");
      }
      console.log(result);
    }
  );

  // -----------------------------------------  (Many) Insert atau menambahkan collection pada student
  db.collection("student").insertMany(
    [
      {
        nama: "Maxim",
        nis: 1200900,
      },
      {
        nama: "Michael",
        nis: 12008711,
      },
    ],
    (error, result) => {
      if (error) {
        return console.log("Data Gagal Ditambahkan");
      }
      return console.log(result);
    }
  );

  //--------------------------------------------- Menampilkan Data (Find)
  console.log(
    db
      .collection("student")
      .find()
      .toArray((error, result) => {
        console.log(result);
      })
  );

  // ---------------------------------------------- Mengubah Data (Update)
  db.collection("student").updateOne(
    {
      _id: ObjectID("610a860195ea3e0130b27335"),
    },
    {
      $set: {
        nama: "Sebastian",
      },
    }
  );

  //------------------------------------------------ Delete Data (Delete)
  db.collection("student").deleteOne({
    _id: ObjectID("610a860195ea3e0130b27335"),
  });
});
