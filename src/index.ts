import dotenv from "dotenv";
dotenv.config();

import app from "./app.ts";
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});
