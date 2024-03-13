const LEVEL_ACTIVITY = {
  1: 1.2,
  2: 1.375,
  3: 1.55,
  4: 1.725,
  5: 1.9,
};

const calculateBMR = ({
  currentWeight,
  height,
  birthday,
  levelActivity,
  sex,
}) => {
  const age = new Date().getFullYear() - new Date(birthday).getFullYear();
  if (sex === 'male') {
    const brm =
      (10 * currentWeight + 6.25 * height - 5 * age + 5) *
      LEVEL_ACTIVITY[levelActivity];
    return brm;
  }
  const brm =
    (10 * currentWeight + 6.25 * height - 5 * age - 161) *
    LEVEL_ACTIVITY[levelActivity];
  return brm;
};

module.exports = calculateBMR;
