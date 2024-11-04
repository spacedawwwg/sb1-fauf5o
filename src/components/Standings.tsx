import React from 'react';
import { Player } from '../types/tournament';

interface StandingsProps {
  players: Player[];
}

export const Standings: React.FC<StandingsProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Rank</th>
            <th className="py-3 px-6 text-left">Player</th>
            <th className="py-3 px-6 text-left">Army</th>
            <th className="py-3 px-6 text-center">Points</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {sortedPlayers.map((player, index) => (
            <tr key={player.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {index + 1}
              </td>
              <td className="py-3 px-6 text-left">
                {player.name}
              </td>
              <td className="py-3 px-6 text-left">
                {player.army}
              </td>
              <td className="py-3 px-6 text-center">
                {player.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};