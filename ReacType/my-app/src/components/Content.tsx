import React from 'react';
import Part from './Part';
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: 'normal';
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission';
  description: string;
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: 'special';
  requirements: string[];
  description: string;
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

/*
const Content = (props: { courses: arrayof }): JSX.Element => {
  const arrayofCourses = props.courses;
  return (
    <div>
      {arrayofCourses.map((c) => (
        <div key={c.name}>
          <h3>Name:{c.name}</h3> <h3>Excercise Count:{c.exerciseCount}</h3>
        </div>
      ))}
    </div>
  );
};
*/

const Content = (props: { courses: CoursePart[] }): JSX.Element => {
  const arrayofCourses = props.courses;
  return (
    <div>
      <Part courses={arrayofCourses} />{' '}
    </div>
  );
};

export default Content;
