import express from "express";
import cors from "cors";
import "dotenv/config";

import {
  createNewUser,
  getTotalPoints,
  updateUserData,
} from "./utils/database.js";
import { diceRoll } from "./utils/diceRoll.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT;
const CORS_ORIGIN_URI = process.env.CORS_ORIGIN_URI;

// CORS Configuration

const corsOptions = {
  origin: CORS_ORIGIN_URI,
  methods: "POST",
  //   credentials: true,
};

app.use(cors(corsOptions));

app.options("/", cors(corsOptions));

app.post("/api/create-user", async (req, res) => {
  const { username, password } = req.body;

  const createUser = await createNewUser(username, password);

  res.json(createUser);
});

app.post("/api/roll-dice", async (req, res) => {
  const { username, bet_points, bet_on } = req.body;
  console.log(bet_points, bet_on);

  const result = diceRoll();

  let winStatus = false;
  let winAmount = 0;

  if (bet_on === "7d" && result.totalOnRoll < 7) {
    winStatus = true;
    winAmount = bet_points * 2;
  } else if (bet_on === "7" && result.totalOnRoll === 7) {
    winStatus = true;
    winAmount = bet_points * 5;
  } else if (bet_on === "7u" && result.totalOnRoll > 7) {
    winStatus = true;
    winAmount = bet_points * 2;
  } else {
    winStatus = false;
    winAmount = bet_points * -1;
  }

  const totalPoints = await updateUserData(username, winAmount);

  const gameResult = {
    win_status: winStatus,
    win_amount: winAmount,
    total_on_roll: result.totalOnRoll,
    first_dice_face: result.firstDiceFace,
    second_dice_face: result.secondDieFace,
    total_points: totalPoints,
  };

  res.status(200).json(gameResult);
});

app.post("/api/get-total-points", async (req, res) => {
  const { username } = req.body;

  const totalPoints = await getTotalPoints(username);

  res.json({ total_points: totalPoints });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
