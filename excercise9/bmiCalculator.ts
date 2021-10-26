type Result = string;
export const bmiClaculator = (w: number, h: number): Result => {
  h = h / 100;
  h = h * h;
  const c: number = w / h;
  if (c >= 18.5 && c < 25) {
    return "Your BMI is nomral";
  } else if (c >= 25 && c < 30) {
    return "Your BMI is healthy";
  } else if (c > 35) {
    return "Your BMI is heavy";
  } else {
    return "Change W or H";
  }
};

const w = Number(process.argv[2]);
const h = Number(process.argv[3]);
console.log(bmiClaculator(w, h));
