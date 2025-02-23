const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();


app.use(cors({ 
    origin: "*",  
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));

app.use(express.json());

app.post("/telegram/getMe", async (req, res) => {
    const { botToken } = req.body;

    if (!botToken) {
        return res.status(400).json({ error: "Bot token is required" });
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching Telegram API:", error);
        res.status(500).json({ error: "Failed to fetch data from Telegram API" });
    }
});



app.listen(5000, () => console.log("Server running on port 5000"));

