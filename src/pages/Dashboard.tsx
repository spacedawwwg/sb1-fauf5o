import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { TournamentCard } from '../components/TournamentCard';
import { Button } from '../components/ui/Button';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { tournaments, setCurrentTournament } = useTournamentStore();

  const handleTournamentSelect = (tournament) => {
    setCurrentTournament(tournament);
    navigate(`/tournament/${tournament.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tournaments</h1>
        <Button
          onClick={() => navigate('/tournament/new')}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Tournament
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            onSelect={handleTournamentSelect}
          />
        ))}
      </div>
    </div>
  );
};