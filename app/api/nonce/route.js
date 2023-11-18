import crypto from "crypto";
import connectDB from "../../utils/connectDB";
import User from "../../models/schema";

connectDB();

export async function POST(req) {
  const body = await req.json();
  //   const { addresss } = req.body;
  //   console.log(req.body, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", body);
  const stringAddress = body.toString();
  try {
    const addressExists = await User.findOne({
      blockchainAddress: stringAddress,
    });
    console.log(addressExists);
    if (!addressExists) {
      throw new Error({ message: "Please register first" });
      //   return Response.json({ message: "Please register first" });
      //   new Error({ message: "Please register first" });
      //   return res.status(400).json({ message: "Please register first" });
    } else {
      const nonce = crypto.randomBytes(32).toString("hex");
      return Response.json({ message: nonce });
      // res.status(200).json({ message: nonce });
    }
  } catch (error) {
    console.error(error);
    new Error({ message: "An error occurred" });

    // res.status(500).json({ message: "An error occurred" });
  }
}
