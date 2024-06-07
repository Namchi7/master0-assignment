import fs from "fs";
// import usersFromDB from "../database/user_gamedata.json";

export const updateUserData = (username, winAmount) => {
  const users =
    JSON.parse(fs.readFileSync("./database/user_gamedata.json")) || [];

  const user = users.filter((user) => user.username === username)[0];

  const points = user.points;
  const updatedPoints = points + winAmount;

  const newUsersData = users.map((user) => {
    if (user.username === username) {
      return {
        username: username,
        password: user.password,
        points: updatedPoints,
      };
    }
    return user;
  });

  // console.log("New Users Data:", newUsersData);

  fs.writeFileSync(
    "./database/user_gamedata.json",
    JSON.stringify(newUsersData)
  );

  return updatedPoints;
};

export const createNewUser = (username, password) => {
  const users =
    JSON.parse(fs.readFileSync("./database/user_gamedata.json")) || [];

  const user = users.filter((user) => user.username === username)[0];

  if (user) {
    return { success: false, message: "User Already Exists!" };
  }

  const newUser = {
    username: username,
    password: password,
    points: 5000,
  };

  const newUsersData = [...users, newUser];

  fs.writeFileSync(
    "./database/user_gamedata.json",
    JSON.stringify(newUsersData)
  );

  return { success: true, message: "User Created." };
};
export const getTotalPoints = (username) => {
  const users =
    JSON.parse(fs.readFileSync("./database/user_gamedata.json")) || [];

  const user = users.filter((user) => user.username === username)[0];

  if (!user) {
    return 0;
  }

  const totalPoints = user.points;

  return totalPoints;
};
