import { useEffect, useState } from "react";
import axios from "axios";
import TeamTable from "../components/ui/team-table";
import { useNavigate } from "@tanstack/react-router";
import {Card} from "../components/ui/card";

interface TeamData {
  id: number;
  name: string;
  fantasyleagueid: number;
  userid: number;
}

export default function TeamsPage() {
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No token found in localStorage");
      return;
    }

    axios
      .get("http://localhost:5097/api/fantasyteam/get-user-team/1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTeamData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });
  }, []);

  const handleTeamClick = (team: TeamData) => {
    navigate({ to: `/league/${team.id}/${team.name}` });
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center">
      {teamData && (
        <Card>
          <TeamTable
            teamData={teamData}
            onTeamClick={handleTeamClick}
          />
        </Card>
      )}
      <button className="mt-4">Create League</button>
    </div>
  );
}
