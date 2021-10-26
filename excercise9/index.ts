import express from "express";
import { bmiClaculator } from "./bmiCalculator";
import { setObject } from "./exerciseCalculator";
interface FinalResult {
  weight: number;
  height: number;
  result: string;
}
type error = string;

const resObj = (w: number, h: number): FinalResult | error => {
  if (!isNaN(w) && !isNaN(h)) {
    return {
      weight: w,
      height: h,
      result: bmiClaculator(w, h),
    };
  } else {
    return "error: malformatted parameters";
  }
};

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  let h = Number(req.query.height);
  let w = Number(req.query.weight);
  res.send(resObj(w, h));
  console.log(req.body);
});

app.post("/calculator", (req, res) => {
  let array: number[] = req.body.array;
  let target: number = req.body.target;
  res.json(setObject(array, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
