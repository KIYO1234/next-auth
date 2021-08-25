import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  console.log('👍 req.body: ', req.body)
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });
  console.log("👦 existingUser: ", existingUser);

  const hashedPassword = await hashPassword(password);
  // console.log("hashedPassword 🔑: ", hashedPassword);

  if (existingUser) {
    console.log("The user already exists");
    res.status(404).json({ message: "The user already exists" });
    client.close()
    return;
  } else {
    const result = await db
      .collection("users")
      .insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
};

export default handler;
