import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
const App = () => {
  const courseName = 'Half Stack application development';
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

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <div>
        <Content courses={courseParts} />
      </div>
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
