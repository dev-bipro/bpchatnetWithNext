// import { dbConnect } from "@/lib/db";
import { userModel } from "@/lib/model/user";
// import { connect } from "mongoose";

const isAccount = async (email) => {
  //   await connect(dbConnect);
  const result = await userModel.findOne({ email: email });
  console.log(Boolean(result));
  return result;
};
export default isAccount;
