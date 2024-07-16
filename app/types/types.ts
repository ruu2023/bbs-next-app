export interface BBSData {
  id: number;
  username: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface TaskData {
  id?: number;
  text: string;
}
