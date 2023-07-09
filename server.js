import { connectDB } from "./data/database.js";
import { app } from "./app.js";

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
