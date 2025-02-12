import { Option } from './option.model';

export interface Poll {
  id: number;
  name: string;
  description: string;
  totalVotes: number;
  status: string;
  options: Array<Option>;
}
