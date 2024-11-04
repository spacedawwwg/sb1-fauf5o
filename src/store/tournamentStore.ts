import { create } from 'zustand';
import { Tournament, Match, Player } from '../types/tournament';

interface TournamentStore {
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  setCurrentTournament: (tournament: Tournament) => void;
  addTournament: (tournament: Tournament) => void;
  updateMatch: (match: Match) => void;
  generatePairings: (players: Player[], round: number) => Match[];
}

export const useTournamentStore = create<TournamentStore>((set) => ({
  tournaments: [],
  currentTournament: null,
  setCurrentTournament: (tournament) => set({ currentTournament: tournament }),
  addTournament: (tournament) =>
    set((state) => ({ tournaments: [...state.tournaments, tournament] })),
  updateMatch: (updatedMatch) =>
    set((state) => ({
      currentTournament: state.currentTournament
        ? {
            ...state.currentTournament,
            matches: state.currentTournament.matches.map((match) =>
              match.id === updatedMatch.id ? updatedMatch : match
            ),
          }
        : null,
    })),
  generatePairings: (players, round) => {
    // Swiss pairing algorithm implementation
    // Avoid first round matchups between players from same club
    return [];
  },
}));