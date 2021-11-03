import React from 'react';
interface Details {
  name: string;
  exerciseCount: number;
}
type arrayof = Array<Details>;

const Total = (props: { courses: arrayof }): JSX.Element => {
  return (
    <div>
      Number of exercises{' '}
      {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};
export default Total;
