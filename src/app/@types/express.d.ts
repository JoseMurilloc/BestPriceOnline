declare namespace Express {
  export interface Request {
    user: {
      id: string;
      provider: boolean;
    }
  }
}
