import { task } from '../tasks/task.model';

export const data: task[] = [
  {
    id: 0,
    completed: false,
    title: 'Not Doing Anything',
    category: 'Life',
    dateCreation: new Date(),
  },
  {
    id: 1,
    completed: false,
    title: 'Kinda doing something',
    category: 'Academics',
    dateCreation: new Date(),
  },
  {
    id: 2,
    completed: false,
    title: 'Maybe Doing Something',
    category: 'Work',
    dateCreation: new Date(),
  },
];
