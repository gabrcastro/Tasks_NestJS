export enum TaskStatus {
  DONE = 0,
  IN_PROGRESS = 1,
  NOT_STARTED = 2,
}

export class Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  expirationDate: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    status: number,
    expirationDate: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.expirationDate = expirationDate;
  }
}
