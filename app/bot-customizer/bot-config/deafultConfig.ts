export interface BotConfiguration {
    botProfile: {
      name: string
      username: string
      description: string
      profilePicture: string | null
    }
    commands: Array<{
      id: string
      name: string
      description: string
      category: string
    }>
    inlineQueries: {
      enabled: boolean
      queries: Array<{
        id: string
        keyword: string
        response: string
      }>
    }
    keyboard: {
      inlineKeyboard: Array<Array<{ text: string; callback_data: string }>>
      replyKeyboard: Array<Array<string>>
    }
    webhook: {
      enabled: boolean
      url: string
      maxConnections: number
    }
    permissions: {
      adminOnly: boolean
      userRoles: {
        admins: string[]
        moderators: string[]
        users: string[]
      }
    }
    payments: {
      enabled: boolean
      provider: string
      currency: string
    }
    triggers: Array<{
      id: string
      text: string
      response: string
    }>
    analytics: {
      enabled: boolean
      provider: string
    }
    localization: {
      defaultLanguage: string
      supportedLanguages: string[]
      translations: Record<string, Record<string, string>>
    }
    security: {
      ipWhitelist: string[]
      twoFactorAuth: boolean
      dataRetentionDays: number
    }
  }
  
  export const getDefaultBotConfiguration = (): BotConfiguration => {
    return {
      botProfile: {
        name: "Default Bot",
        username: "default_bot",
        description: "This is a default bot configuration",
        profilePicture: null,
      },
      commands: [
        { id: "cmd_start", name: "/start", description: "Hi, How may i help you", category: "General" },
        { id: "cmd_help", name: "/help", description: "Show help menu", category: "General" },
      ],
      inlineQueries: {
        enabled: false,
        queries: [],
      },
      keyboard: {
        inlineKeyboard: [],
        replyKeyboard: [],
      },
      webhook: {
        enabled: false,
        url: "",
        maxConnections: 40,
      },
      permissions: {
        adminOnly: false,
        userRoles: {
          admins: [],
          moderators: [],
          users: [],
        },
      },
      payments: {
        enabled: false,
        provider: "",
        currency: "USD",
      },
      triggers: [],
      analytics: {
        enabled: false,
        provider: "",
      },
      localization: {
        defaultLanguage: "en",
        supportedLanguages: ["en"],
        translations: {},
      },
      security: {
        ipWhitelist: [],
        twoFactorAuth: false,
        dataRetentionDays: 30,
      },
    }
  }
  
  