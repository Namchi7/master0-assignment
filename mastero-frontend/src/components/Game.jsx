import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import SelectBetButtonGroup from "./mui/SelectBetButtonGroup";

import dice1 from "../assets/images/dice-1.png";
import dice2 from "../assets/images/dice-2.png";
import dice3 from "../assets/images/dice-3.png";
import dice4 from "../assets/images/dice-4.png";
import dice5 from "../assets/images/dice-5.png";
import dice6 from "../assets/images/dice-6.png";
import diceRolling from "../assets/svg/rolling-dice.svg";
import RollDiceLoading from "./mui/RollDiceLoading";
import ResultAlert from "./mui/ResultAlert";

const containerStyles = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  p: "5rem 1rem",
  pt: "1rem",
  backgroundColor: "rgb(254, 134, 74)",
  color: "white",
};

const betsStyles = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "0.25rem",
};

const rollDiesButtonStyles = {
  width: "100%",
  p: "0.75rem 1rem",
  fontSize: "1.25rem",
  fontWeight: "700",
  textTransform: "uppercase",
  background: "#27eb27",
  color: "#007200",
  borderBottom: "5px solid rgb(1, 156, 1)",
  borderRadius: "12px",
  ":hover": {
    background: "#17cf17",
    color: "#007200",
  },
};

const diceBoxStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "0rem",
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(5px)",
  "-webkit-backdrop-filter": "blur(5px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
};

const diceImageBoxStyle = {
  width: "calc(50% - 0.5rem)",
  p: "1rem",
  borderRadius: "12px",
};

function Game() {
  const backendURI = process.env.BACKEND_URI;

  const betList = ["7 Down", "Lucky 7", "7 UP"];
  const betPointList = ["100", "200", "500"];

  const [totalPoints, setTotalPoints] = useState(0);
  const [betOn, setBetOn] = useState(null);
  const [betPoints, setBetPoints] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const [firstDiceNumber, setFirstDiceNumber] = useState(1);
  const [secondDiceNumber, setSecondDiceNumber] = useState(2);
  const [firstDice, setFirstDice] = useState();
  const [secondDice, setSecondDice] = useState();

  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertResult, setAlertResult] = useState("");

  const diceImageFromNumber = (num, setDice) => {
    if (num === 1) return setDice(dice1);
    if (num === 2) return setDice(dice2);
    if (num === 3) return setDice(dice3);
    if (num === 4) return setDice(dice4);
    if (num === 5) return setDice(dice5);
    if (num === 6) return setDice(dice6);
  };

  const rollDice = async () => {
    if (betOn === "7 Down") {
      setBetOn("7d");
    } else if (betOn === "7 UP") {
      setBetOn("7u");
    } else if (betOn === "Lucky 7") {
      setBetOn("7");
    }

    const data = JSON.stringify({
      username: "user1",
      bet_on: betOn,
      bet_points: betPoints,
    });

    const startTime = performance.now();
    setLoading(true);

    const res = await axios.request({
      method: "post",
      maxBodyLength: Infinity,
      url: `${backendURI}/roll-dice`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });

    const result = await res.data;

    const endTime = performance.now();

    await setTimeout(() => {
      setLoading(false);
      setOpenAlert(true);

      if (!loading) {
        if (result.win_status) {
          setAlertResult(`You win. +${result.win_amount} points!!!`);
        } else {
          setAlertResult(`You did not win. ${result.win_amount} points :(`);
        }

        setTotalPoints(result.total_points);
      }
    }, 5000 - (endTime - startTime));

    setFirstDiceNumber(result.first_dice_face);
    setSecondDiceNumber(result.second_dice_face);

    console.log("result: ", result);
  };

  const getTotalPoints = async () => {
    const data = JSON.stringify({
      username: "user1",
    });

    const res = await axios.request({
      method: "post",
      maxBodyLength: Infinity,
      url: `${backendURI}/get-total-points`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });

    const result = await res.data;

    setTotalPoints(result.total_points);

    console.log("result: ", result);
  };

  useEffect(() => {
    getTotalPoints();
  }, []);

  useEffect(() => {
    diceImageFromNumber(firstDiceNumber, setFirstDice);
    diceImageFromNumber(secondDiceNumber, setSecondDice);
  }, [firstDiceNumber, secondDiceNumber]);

  useEffect(() => {
    if (betOn === null || betPoints === null) {
      setIsDisabled(true);
    } else if (parseInt(totalPoints) < parseInt(betOn)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [betOn, betPoints]);

  return (
    <Container sx={containerStyles}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          gap: "1rem",
        }}
      >
        <Chip sx={{ color: "white" }} label={`Points: ${totalPoints}`} />
        <Typography
          sx={{
            width: "100%",
            textTransform: "uppercase",
            textAlign: "center",
          }}
          variant="h1"
        >
          Place a bet
        </Typography>
      </Box>

      <Box sx={diceBoxStyle}>
        <Box sx={diceImageBoxStyle}>
          <img
            src={loading ? diceRolling : firstDice}
            alt={loading ? "?" : firstDiceNumber}
            className="dice-image"
          />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={diceImageBoxStyle}>
          <img
            src={loading ? diceRolling : secondDice}
            alt={loading ? "?" : secondDiceNumber}
            className="dice-image"
          />
        </Box>
      </Box>

      <Box sx={{ ...betsStyles, gap: "1rem", position: "relative" }}>
        <Box sx={betsStyles}>
          <Typography variant="h4">Select Bet: </Typography>
          <SelectBetButtonGroup setItem={setBetOn} items={betList} />
        </Box>

        <Box sx={betsStyles}>
          <Typography variant="h4">Select Bet Points: </Typography>
          <SelectBetButtonGroup setItem={setBetPoints} items={betPointList} />
        </Box>

        <Button
          sx={rollDiesButtonStyles}
          disabled={isDisabled}
          onClick={() => rollDice()}
        >
          Roll Dice
        </Button>

        {loading && <RollDiceLoading />}
      </Box>

      <ResultAlert
        open={openAlert}
        setOpenAlert={setOpenAlert}
        result={alertResult}
      />
    </Container>
  );
}

export default Game;
