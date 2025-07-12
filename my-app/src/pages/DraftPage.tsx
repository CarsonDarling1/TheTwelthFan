import { Card } from "../components/ui/card";
import PickList from "../components/ui/pick-list";
import Timer from "@/components/ui/timer";
import PlayerCard, { Player } from "../components/ui/player-card";
import { useEffect, useState } from "react";

interface User {
  id: number;
  pickNumber: number;
  name: string;
  userid: number;
}

const mockUserList: User[] = [
  { id: 1, pickNumber: 0, name: "Team", userid: 1 },
  { id: 2, pickNumber: 1, name: "Alice Johnson", userid: 22 },
  { id: 3, pickNumber: 2, name: "Bob Smith", userid: 23 },
  { id: 4, pickNumber: 3, name: "Charlie Brown", userid: 24 },
  { id: 5, pickNumber: 4, name: "Diana Prince", userid: 25 },
  { id: 6, pickNumber: 5, name: "Evan Wright", userid: 26 },
];

const nflPlayerStats = [
  { id: 1, name: "Patrick Mahomes", team: "Kansas City Chiefs", position: "QB", pointLastSeason: 43, passingYards: 4500, passingTouchdowns: 38, interceptions: 12, rushingYards: 300, rushingTouchdowns: 2 },
  { id: 2, name: "Josh Allen", team: "Buffalo Bills", position: "QB", pointLastSeason: 52, passingYards: 4200, passingTouchdowns: 35, interceptions: 10, rushingYards: 700, rushingTouchdowns: 8 },
  { id: 3, name: "Justin Jefferson", team: "Minnesota Vikings", position: "WR", pointLastSeason: 32, receivingYards: 1400, receivingTouchdowns: 14 },
  { id: 4, name: "Christian McCaffrey", team: "San Francisco 49ers", position: "RB", pointLastSeason: 48, rushingYards: 1100, rushingTouchdowns: 12, receivingYards: 600, receivingTouchdowns: 5 },
  { id: 5, name: "Joe Burrow", team: "Cincinnati Bengals", position: "QB", pointLastSeason: 39, passingYards: 4300, passingTouchdowns: 34, interceptions: 9, rushingYards: 250, rushingTouchdowns: 3 },
  { id: 6, name: "Tyreek Hill", team: "Miami Dolphins", position: "WR", pointLastSeason: 41, receivingYards: 1600, receivingTouchdowns: 11 },
  { id: 7, name: "Derrick Henry", team: "Tennessee Titans", position: "RB", pointLastSeason: 44, rushingYards: 1500, rushingTouchdowns: 16, receivingYards: 300, receivingTouchdowns: 2 },
  { id: 8, name: "Jalen Hurts", team: "Philadelphia Eagles", position: "QB", pointLastSeason: 50, passingYards: 3900, passingTouchdowns: 30, interceptions: 8, rushingYards: 800, rushingTouchdowns: 10 },
  { id: 9, name: "Stefon Diggs", team: "Buffalo Bills", position: "WR", pointLastSeason: 36, receivingYards: 1300, receivingTouchdowns: 10 },
  { id: 10, name: "Lamar Jackson", team: "Baltimore Ravens", position: "QB", pointLastSeason: 47, passingYards: 3600, passingTouchdowns: 28, interceptions: 6, rushingYards: 900, rushingTouchdowns: 7 },
  { id: 11, name: "Travis Kelce", team: "Kansas City Chiefs", position: "TE", pointLastSeason: 34, receivingYards: 1200, receivingTouchdowns: 9 },
  { id: 12, name: "Saquon Barkley", team: "New York Giants", position: "RB", pointLastSeason: 38, rushingYards: 1300, rushingTouchdowns: 10, receivingYards: 400, receivingTouchdowns: 2 },
  { id: 13, name: "CeeDee Lamb", team: "Dallas Cowboys", position: "WR", pointLastSeason: 40, receivingYards: 1350, receivingTouchdowns: 12 },
];
export default function DraftPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [currentTeamId, setCurrentTeamId] = useState<number | null>(null);
  const [currentPickNumber, setCurrentPickNumber] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const token = localStorage.getItem("authToken");


useEffect(() => {
  // Set default simulated user if none is selected
  if (!currentUser) {
    setCurrentUser(mockUserList[0]); // now has correct ID (7)
  }
}, [currentUser]);

  useEffect(() => {
    const fetchCurrentTurn = async () => {
      const res = await fetch("http://localhost:5097/api/draft/current-turn?leagueId=3", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Fetch error:", res.status, text);
        return;
      }

      const data = await res.json();
      console.log("API /current-turn response:", data);
      if (!data.IsComplete) {
        setCurrentTeamId(data.teamId);
        setCurrentPickNumber(data.PickNumber);
        console.log("Current Team Id: ", data.teamId);

      }
    };

    fetchCurrentTurn();
  }, [token]);

  const statKeys = Array.from(
    new Set(nflPlayerStats.flatMap((player) => Object.keys(player)))
  ).filter((key) => key !== "name" && key !== "team" && key !== "position");

  const sortedStats = [...nflPlayerStats].sort(
    (a, b) => (b.pointLastSeason ?? 0) - (a.pointLastSeason ?? 0)
  );

  const handleSelect = (player: Player) => {
    if (!currentUser || currentUser.id !== currentTeamId) return;
    setSelectedPlayer(player.name);
  };

const submitDraftPick = async () => {
  if (!selectedPlayer || !currentUser || currentUser.id !== currentTeamId) return;

  const player = nflPlayerStats.find((p) => p.name === selectedPlayer);
  if (!player) return;

  console.log("Submitting pick:", {
    LeagueId: 3,
    TeamId: currentUser.id,
    UserId: currentUser.userid,
    PlayerId: player.id,
  });

  const response = await fetch("http://localhost:5097/api/draft/pick", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      LeagueId: 3,
      TeamId: currentUser.id,
      UserId: currentUser.userid,
      PlayerId: player.id,
    }),
  });

  if (response.ok) {
    setSelectedPlayer(null);

    const updatedRes = await fetch("http://localhost:5097/api/draft/current-turn?leagueId=3", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (updatedRes.ok) {
      const data = await updatedRes.json();
      setCurrentTeamId(data.TeamId);
      setCurrentPickNumber(data.PickNumber);
    } else {
      console.error("Failed to fetch updated turn after pick");
    }
  } else {
    const errorText = await response.text();
    console.error("Pick failed:", response.status, errorText);
  }
};

console.log("CurrentUser ID:", currentUser?.id);
console.log("Current Team ID:", currentTeamId);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-none border-b-2">
        <Timer onExpire={submitDraftPick} />
        {currentUser && (
          <div className="flex justify-center mt-2">
            <label className="mr-2 text-sm font-medium">Simulate as:</label>
            <select
              value={currentUser.id}
              onChange={(e) =>
                setCurrentUser(
                  mockUserList.find(user => user.id === Number(e.target.value)) || null
                )
              }
              className="border p-1 rounded text-sm"
            >
              {mockUserList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {currentPickNumber && (
          <div className="text-center text-sm text-gray-600 mt-2">
            Current Pick: #{currentPickNumber}
          </div>
        )}
        {selectedPlayer && (
          <div className="flex justify-center mt-4 pb-4">
            <button
              onClick={submitDraftPick}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Lock It In!
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-wrap gap-4 p-4 w-full overflow-y-auto">
          {sortedStats.map((player) => (
            <PlayerCard
              key={player.name}
              player={player}
              statKeys={statKeys}
              onSelect={handleSelect}
              isSelected={selectedPlayer === player.name}
            />
          ))}
        </div>

        <div className="w-64 h-full flex-shrink-0">
          <Card className="w-full h-full rounded-md shadow-md p-0">
            {currentTeamId !== null && (
              <PickList
                userList={mockUserList}
                className=""
                currentTeamId={currentTeamId}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
