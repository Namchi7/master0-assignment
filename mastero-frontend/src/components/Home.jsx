import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

function Home() {
  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5rem",
        p: "5rem 1rem",
        backgroundColor: "rgb(226, 21, 189)",
        background:
          "linear-gradient(110deg, rgba(226, 21, 189, 1) 0%, rgba(255, 130, 67, 1) 100%)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          "-webkit-backdrop-filter": "blur(5px)",
          textTransform: "uppercase",
        }}
      >
        <Typography sx={{ color: "#181818" }} variant="h2">
          Welcome to
        </Typography>
        <Typography sx={{ color: "rgb(45, 244, 211)" }} variant="h1">
          7 UP 7 DOWN
        </Typography>
        <Typography sx={{ color: "#181818" }} variant="h2">
          Game
        </Typography>
      </Box>

      <Link to={"/game"} className="startButton">
        <Button
          sx={{
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
          }}
        >
          Start
        </Button>
      </Link>
    </Container>
  );
}

export default Home;
