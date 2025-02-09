import { Votes } from './votes.model';

export interface Option {
  name: string;
  id: number;
  voteCount: number;
  votes: Array<Votes>;
}
