export interface IProject {
  _id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies?: string[];
}
