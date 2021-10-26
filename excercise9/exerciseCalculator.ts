interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface ArrayValues {
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
  value7: number;
}
export const setObject = (a: number[], target: number): ResultObject => {
  const av = a.reduce((a, b) => a + b, 0) / a.length;
  let rati;
  let desc;
  if (av >= target && av < target + 1) {
    rati = 2;
    desc = "Decent!";
  } else if (av >= target + 1) {
    rati = 3;
    desc = "Very GOOD!";
  } else if (av < target) {
    rati = 1;
    desc = "We need to improove";
  } else {
    rati = 0;
    desc = "Defentily Not the best week ";
  }
  return {
    periodLength: a.length,
    trainingDays: a.filter((a) => a !== 0).length,
    target: target,
    average: av,
    success: av > target ? true : false,
    rating: rati,
    ratingDescription: desc,
  };
};

const fillArray = (args: Array<string>): ArrayValues => {
  if (args.length < 9) throw new Error("Not enough arguments");
  if (args.length > 9) throw new Error("Too many arguments");
  if (
    !isNaN(Number(args[2])) &&
    !isNaN(Number(args[3])) &&
    !isNaN(Number(args[4])) &&
    !isNaN(Number(args[5])) &&
    !isNaN(Number(args[6])) &&
    !isNaN(Number(args[7])) &&
    !isNaN(Number(args[8]))
  ) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
      value3: Number(args[4]),
      value4: Number(args[5]),
      value5: Number(args[6]),
      value6: Number(args[7]),
      value7: Number(args[8]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  console.log(fillArray(process.argv));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const array: number[] = Object.values(fillArray(process.argv));
  console.log(array);
  console.log(setObject(array, 2));
} catch (e) {
  console.log("Error, something bad happened");
}
