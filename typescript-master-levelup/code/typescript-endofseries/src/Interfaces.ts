export interface Person {
  name: string;
  age?: number; // ? Optional param
}

enum Job {
  WebDev,
  WebDesigner,
  PM
}

export default Job;

export enum Type2 {
  Video = 'VIDEO',
  BlogPost = 'BLOG_POST', // 1
  Quiz = 'QUIZ' // 2
}
