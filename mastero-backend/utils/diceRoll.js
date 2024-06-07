export const diceRoll = () => {
  const firstDieFace = Math.floor(Math.random(7) * (7 - 1)) + 1;
  const secondDieFace = Math.floor(Math.random(7) * (7 - 1)) + 1;
  const totalOnRoll = firstDieFace + secondDieFace;

  const onSevenRoll = Math.floor(Math.random(4) * (4 - 1)) + 1;

  if (totalOnRoll === 7 && onSevenRoll !== 2) {
    const firstDieFaceAgain = Math.floor(Math.random(7) * (7 - 1)) + 1;
    const secondDieFaceAgain = Math.floor(Math.random(7) * (7 - 1)) + 1;
    const totalOnRollAgain = firstDieFaceAgain + secondDieFaceAgain;

    return {
      totalOnRoll: totalOnRollAgain,
      firstDiceFace: firstDieFaceAgain,
      secondDieFace: secondDieFaceAgain,
    };
  }

  return {
    totalOnRoll: totalOnRoll,
    firstDiceFace: firstDieFace,
    secondDieFace: secondDieFace,
  };
};
