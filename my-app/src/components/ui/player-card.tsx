// components/ui/player-card.tsx
import { Card } from "./card";

export interface Player {
  name: string;
  team: string;
  position: string;
  pointLastSeason?: number;
  passingYards?: number;
  passingTouchdowns?: number;
  interceptions?: number;
  rushingYards?: number;
  rushingTouchdowns?: number;
  receivingYards?: number;
  receivingTouchdowns?: number;
  [key: string]: string | number | undefined;
}

interface PlayerCardProps {
  player: Player;
  statKeys: string[];
  onSelect: (player: Player) => void;
  isSelected?: boolean;
}

export default function PlayerCard({
  player,
  statKeys,
  onSelect,
  isSelected = false,
}: PlayerCardProps) {
  return (
    <Card
      onClick={() => onSelect(player)}
      className={`w-64 p-4 rounded-lg shadow-md cursor-pointer ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Player Image</span>
      </div>

      <h2 className="text-lg font-semibold">{player.name}</h2>
      <p className="text-sm text-gray-600">{player.team}</p>
      <p className="text-sm text-gray-500 mb-2">{player.position}</p>

      <div className="space-y-1 text-sm">
        {statKeys.map((stat) => {
          const value = player[stat];
          if (value === null || value === undefined || value === 0) return null;

          return (
            <div key={stat}>
              <span
                className={`capitalize ${
                  stat === "pointLastSeason"
                    ? "font-bold text-green-600"
                    : "font-medium"
                }`}
              >
                {stat.replace(/([A-Z])/g, " $1")}:
              </span>{" "}
              <span
                className={`${
                  stat === "pointLastSeason"
                    ? "text-green-600 font-semibold"
                    : "text-gray-800"
                }`}
              >
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
