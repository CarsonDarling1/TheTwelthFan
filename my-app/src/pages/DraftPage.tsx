import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import PickList from "../components/ui/pick-list";
import Timer from "@/components/ui/timer";
import PlayerCard, { Player } from "../components/ui/player-card";

interface User {
  id: number;
  pickNumber: number;
  name: string;
  userid: number;
}

export default function DraftPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [currentTeamId, setCurrentTeamId] = useState<number | null>(null);
  const [currentPickNumber, setCurrentPickNumber] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("http://localhost:5097/api/players", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5097/api/draft/teams?leagueId=3", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUserList(data);
        if (!currentUser) setCurrentUser(data[0]); // Set default simulator
      } else {
        console.error("Failed to fetch user list");
      }
    };

    fetchUsers();
  }, [token]);

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
      if (!data.IsComplete) {
        setCurrentTeamId(data.teamId);
        setCurrentPickNumber(data.pickNumber);
      }
    };

    fetchCurrentTurn();
  }, [token]);

  const statKeys = Array.from(
    new Set(players.flatMap((player) => Object.keys(player)))
  ).filter((key) => key !== "name" && key !== "team" && key !== "position");

  const sortedStats = [...players].sort(
    (a, b) => (b.pointLastSeason ?? 0) - (a.pointLastSeason ?? 0)
  );

  const handleSelect = (player: Player) => {
    console.log("Selected player:", selectedPlayer);
    console.log("Current user:", currentUser);
    console.log("Current team ID:", currentTeamId);
    console.log("Can pick?", currentUser?.id === currentTeamId);
    if (!currentUser || currentUser.id !== currentTeamId) return;
    setSelectedPlayer(player.name);
  };

  const submitDraftPick = async () => {
    console.log("Current user:", currentUser);
    console.log("Current team ID:", currentTeamId);
    console.log("Can pick?", currentUser?.id === currentTeamId);
    if (!selectedPlayer || !currentUser || currentUser.id !== currentTeamId) return;

    const player = players.find((p) => p.name === selectedPlayer);
    console.log(player?.id);
    if (!player) return;

    const response = await fetch("http://localhost:5097/api/draft/pick", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });

      if (updatedRes.ok) {
        const data = await updatedRes.json();
        setCurrentTeamId(data.teamId);
        setCurrentPickNumber(data.pickNumber);
      } else {
        console.error("Failed to fetch updated turn after pick");
      }
    } else {
      const errorText = await response.text();
      console.error("Pick failed:", response.status, errorText);
    }
  };

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
                setCurrentUser(userList.find(user => user.id === Number(e.target.value)) || null)
              }
              className="border p-1 rounded text-sm"
            >
              {userList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {currentPickNumber !== null && (
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
                userList={userList}
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
