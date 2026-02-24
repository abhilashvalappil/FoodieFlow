
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Menu from './models/menuModel.js';

dotenv.config();

const menuItems = [
    {
        name: "Margherita Pizza",
        description: "Classic Italian pizza with fresh tomatoes, mozzarella cheese, and basil leaves on a thin, crispy crust.",
        price: 12.99,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Double Cheese Burger",
        description: "Juicy double beef patty with melted cheddar, pickles, onions, and our signature special sauce in a toasted brioche bun.",
        price: 10.49,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop"
    },
    {
        name: "Fresh Salmon Sushi",
        description: "Premium Atlantic salmon over seasoned rice, served with pickled ginger, wasabi, and soy sauce.",
        price: 15.99,
        category: "Sushi",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Hyderabadi Chicken Biryani",
        description: "Fragrant long-grain basmati rice cooked with tender chicken marinated in yogurt and traditional spices.",
        price: 14.25,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1589302168068-1c498202f922?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Pesto Pasta",
        description: "Al dente penne pasta tossed in a rich, creamy basil pesto sauce with pine nuts and parmesan cheese.",
        price: 11.99,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1994&auto=format&fit=crop"
    },
    {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a gooey molten heart, served with a scoop of premium vanilla bean ice cream.",
        price: 7.99,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop"
    },
    {
        name: "Greek Salad",
        description: "Fresh cucumbers, vine-ripened tomatoes, red onions, Kalamata olives, and creamy feta cheese drizzled with extra virgin olive oil.",
        price: 8.50,
        category: "Salads",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "BBQ Chicken Wings",
        description: "Crispy chicken wings tossed in a smoky honey BBQ sauce, served with ranch dip and celery sticks.",
        price: 11.25,
        category: "Appetizers",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=2053&auto=format&fit=crop"
    }
];

const seedDatabase = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined");
        }

        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing menu items (optional, but good for a fresh start in a demo)
        await Menu.deleteMany({});
        console.log("Cleared existing menu items.");

        // Insert new menu items
        await Menu.insertMany(menuItems);
        console.log("Successfully seeded database with food items!");

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
