if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development"
}

if (!process.env.PORT) {
    process.env.PORT = 3000
}

if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = ""
}