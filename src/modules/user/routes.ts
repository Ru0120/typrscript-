import express, { Response } from "express";

import { IAuthRequest } from "../../index";

import { Users } from "../../db/models/Users";

export const userRoutes = express.Router();

userRoutes.get("/get-token", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    res.send(user.getToken());
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknown Error");
  }
});

userRoutes.get("/profile", async (req: IAuthRequest, res: Response) => {
  const { userId } = req.user || {};

  try {
    const user = await Users.findOne({ _id: { $eq: userId } });

    res.send(user);
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknown Error");
  }
});

userRoutes.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findOne({ _id: { $eq: userId } });

    res.send(user);
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknown Error");
  }
});

userRoutes.get("/others", async (req: IAuthRequest, res: Response) => {
  const { userId } = req.user || {};

  try {
    const user = await Users.find({ _id: { $ne: userId } });

    res.send(user);
  } catch (e) {
    res.send(e instanceof Error ? e.message : "Unknown Error");
  }
});

userRoutes.put("/", async (req: IAuthRequest, res: Response) => {
  const { username, email } = req.body;
  const { userId: myid } = req.user || {};

  try {
    const user = await Users.findOneAndUpdate(
      { _id: { $eq: myid } },
      { $set: { username: username, email } },
      { new: true }
    );

    res.send(user);
  } catch (e) {
    res.send("ooriin haygaar newterne vv");
  }
});
