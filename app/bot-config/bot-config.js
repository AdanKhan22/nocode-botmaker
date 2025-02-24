export const botConfig = {
    botProfile: {
      name: "Default Bot",
      username: "default_bot",
      description: "This is a bot",
      profilePicture: null, // URL or base64
    },
  
    commands: [
      { id: "cmd_start", name: "/start", description: "Start the bot", category: "General" },
      { id: "cmd_help", name: "/help", description: "Show help menu", category: "General" },
      { id: "cmd_settings", name: "/settings", description: "Adjust bot settings", category: "Settings" },
    ],
  
    messages: {
      welcome: "Welcome to the bot!",
      error: "Something went wrong!",
      unknownCommand: "I don't understand that command.",
    },
  
    permissions: {
      adminOnly: false,
      userRoles: {
        admins: [],
        moderators: [],
        users: [],
      },
    },
  
    triggers: [
      { id: "trg_hello", text: "hello", response: "Hi there!" },
      { id: "trg_bye", text: "bye", response: "Goodbye!" },
    ],
  
    webhook: {
      enabled: true,
      url: "https://yourserver.com/webhook",
      maxConnections: 40,
    },
  
    polling: {
      enabled: false,
      interval: 3000, // in ms
    },
  
    keyboard: {
      inlineKeyboard: [
        [{ text: "Option 1", callback_data: "option_1" }],
        [{ text: "Option 2", callback_data: "option_2" }],
      ],
      replyKeyboard: [
        ["Command 1", "Command 2"],
        ["Help", "Settings"],
      ],
    },
  
    inlineQueries: {
      enabled: true,
      queries: [
        { id: "query1", keyword: "weather", response: "Current weather is 25°C" },
      ],
    },
  
    callbackQueries: {
      enabled: true,
      actions: [
        { id: "callback1", data: "option_1", response: "You selected Option 1" },
      ],
    },
  
    apiMethods: {
      sendMessage: true,
      editMessage: true,
      deleteMessage: true,
      sendPhoto: true,
      sendVideo: true,
      sendAudio: true,
      sendDocument: true,
      sendSticker: true,
      sendPoll: true,
      getChat: true,
      getChatMembersCount: true,
      getChatAdministrators: true,
      setWebhook: true,
      deleteWebhook: true,
      sendChatAction: true,
    },
  };
  