
const supabase = require("../lib/supabaseClient");

async function storeBotToken(userId, botToken) {
    try {
        const { data, error } = await supabase
            .from("bot_tokens")
            .insert([{ user_id: userId, token: botToken }]);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error storing bot token:", error);
        throw error;
    }
}

// Function to retrieve a bot token by userId
async function getBotToken(userId) {
    try {
        const { data, error } = await supabase
            .from("bot_tokens")
            .select("token")
            .eq("user_id", userId)
            .single();

        if (error) throw error;
        return data.token;
    } catch (error) {
        console.error("Error fetching bot token:", error);
        throw error;
    }
}

module.exports = { storeBotToken, getBotToken };
