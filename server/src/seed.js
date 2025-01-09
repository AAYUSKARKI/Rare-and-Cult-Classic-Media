import mongoose from "mongoose";
// import Media from "./model/media.model.js";
import { faker } from '@faker-js/faker';
import Link from "./model/link.model.js";



const seedDatabase = async () => {
  try {
    // Connect to MongoDB
  await mongoose.connect("mongodb+srv://dbUser:jeUR3sJ4u3TH7rxw@cluster0.ehb9e.mongodb.net/mediaDB?retryWrites=true&w=majority&appName=Cluster0",{dbName:"media"})

    // Clear existing data
    await Link.deleteMany({});

    // Generate and insert more than 100 media entries
    const mediaEntries = [];
    for (let i = 0; i < 200; i++) {
        mediaEntries.push({

            title: faker.lorem.words(3), // Generate a random movie title
    
            link: `https://example.com/movie/${i++}`, // Generate a random movie link
    
            // type: Math.random() > 0.5 ? "SFW" : "NSFW", // Randomly assign SFW or NSFW
    
          });
    }

    await Link.insertMany(mediaEntries);
    console.log("Database seeded successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

seedDatabase();