export interface Player {
  id: string;
  name: string;
  email: string;
  army: string;
  points: number;
  list?: string;
}

export interface Match {
  id: string;
  player1: Player;
  player2: Player;
  player1Score: number;
  player2Score: number;
  round: number;
  table: number;
  completed: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  rounds: number;
  currentRound: number;
  status: 'upcoming' | 'active' | 'completed';
  players: Player[];
  matches: Match[];
}