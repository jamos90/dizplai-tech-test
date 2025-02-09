import { Option } from './option.model';

export interface Poll {
  id: number;
  name: string;
  description: string;
  totalVotes: number;
  options: Array<Option>;
}
