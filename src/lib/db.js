const { DB_USERNAME, DB_PASSWORD } = process.env;
export const dbConnect = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.9lzvod9.mongodb.net/bpchatnetnext?retryWrites=true&w=majority&appName=Cluster0`;
