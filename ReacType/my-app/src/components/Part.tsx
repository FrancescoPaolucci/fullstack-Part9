import React from 'react';
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

const Part = (props: { courses: CoursePart[] }) => {
  const arrayofCourses = props.courses;
  return (
    <div>
      {arrayofCourses.map((element) => {
        switch (element.type) {
          case 'normal':
            return (
              <div>
                <h3>{element.name}</h3>
                <p>Ex count: {element.exerciseCount}</p>
                <p>Description: {element.description}</p>
              </div>
            );
            break;
          case 'groupProject':
            console.log(element.groupProjectCount);
            return (
              <div>
                <h3>{element.name}</h3>
                <p>Ex count: {element.exerciseCount}</p>
                <p>Group Projects: {element.groupProjectCount}</p>
              </div>
            );
            break;
          case 'submission':
            return (
              <div>
                <h3>{element.name}</h3>
                <p>Ex count: {element.exerciseCount}</p>
                <p>Description: {element.description}</p>
                <p>exerciseSubmissionLink: {element.exerciseSubmissionLink}</p>
              </div>
            );
            break;
          case 'special':
            return (
              <div>
                <h3>{element.name}</h3>
                <p>Description: {element.description}</p>
                <p>
                  {' '}
                  {element.requirements.map((r) => (
                    // eslint-disable-next-line react/jsx-key
                    <p>requirements:{r}</p>
                  ))}
                </p>
              </div>
            );

          default:
            break;
        }
      })}
    </div>
  );
};

export default Part;
