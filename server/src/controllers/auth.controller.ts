import asyncHandler from "express-async-handler";
import axios from "axios";
import User from "../models/user";
import jwt from "jsonwebtoken";
import qs from "qs";
import env from "../utils/envalid";
import Token from "../models/token";
import { JWTPayload } from "../middlewares/auth";
import ServerError from "../utils/ServerError";

export const tokenRefresh = asyncHandler(async (req, res, next) => {
  const { token } = req.body;
  const isTokenExist = await Token.findOne({ token: token });
  if(!isTokenExist) throw new ServerError(401, "Unauthorized");
  const decoded = <JWTPayload>jwt.verify(token, env.JWT_REFRESH_SECRET);
  const access_token = jwt.sign({ _id: decoded._id }, env.JWT_SECRET, {
    expiresIn: "30m",
  });
  res.json({ access_token });
});

export const logout = asyncHandler(async (req, res, next) => {
  const { refresh_token } = req.body;
  console.log(refresh_token);

  const loggedOut = await Token.deleteOne({ token: refresh_token });
  if (!loggedOut.deletedCount)
    throw new ServerError(400, "Something went wrong!");
  res.json({ message: "logged out succesfully" });
});

export const googleAuth = asyncHandler(async (req, res, next) => {
  const { id_token, access_token } = await getUserFromCode(
    req.query.code as string
  );
  const userDetail = await getUserDetail(access_token, id_token);
  let user: any = await User.findOne({ email: userDetail.email });
  if (!user) {
    const newUser = new User({
      name: userDetail.name,
      email: userDetail.email,
      avatar:
      userDetail.picture ??
        "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a",
    });
    user = await newUser.save();
  }
  const access_token_server = jwt.sign({ _id: user._id }, env.JWT_SECRET, {
    expiresIn: "30m",
  });
  const refresh_token_server = jwt.sign(
    { _id: user._id },
    env.JWT_REFRESH_SECRET
  );
  const refToken = new Token({
    token: refresh_token_server,
  });
  await refToken.save();
  res.redirect(
    `${env.CLIENT_URL}/oauth/redirect?uid=${user._id}&access_token=${access_token_server}&refresh_token=${refresh_token_server}`
  );
});

async function getUserFromCode(code: string) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: env.clientid,
    client_secret: env.clientsecret,
    redirect_uri: env.redirect_url,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function getUserDetail(access_token: string, id_token: string) {
  return axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
    });
}
