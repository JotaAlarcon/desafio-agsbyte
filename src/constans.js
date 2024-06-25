import 'dotenv/config'
dotenv.config()

export const FIREBASE_CONFIG = {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MASSAGING_SENDER_ID: process.env.MASSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID
}