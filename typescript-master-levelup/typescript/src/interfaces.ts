export interface Person {
  name: string
  age?: number
}

export enum Job {
  WebDev,
  WebDesigner,
  PM,
}

export enum Type {
  Video,
  BlogPost,
  Quiz,
}

enum Type2 {
  Video = 'Video',
  BlogPost = 'Blog',
  Quiz = 'Quiz',
}
export default Type2
