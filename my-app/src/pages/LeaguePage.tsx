import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "@tanstack/react-router";
import { draftRoute } from "../routes";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../components/ui/table";

interface TeamData {
  id: number;
  name: string;
  fantasyleagueid: number;
  userid: number;
}

interface LeagueData {
  id: number;
  name: string;
}

export default function LeaguePage() {
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No token found in localStorage");
      return;
    }

    axios
      .get("http://localhost:5097/api/fantasyteam/get-league-teams/1", {
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

  const handleDraftClick = async (league: LeagueData) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No token found in localStorage");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5097/api/draft/start",
        league.id, // send raw number
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        console.log("Draft started:", res.data);

        // ✅ Navigate after success
        navigate({
          to: draftRoute.to,
          params: {
            id: String(league.id),
            name: league.name,
          },
        });
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert("Draft failed: " + err.response?.data);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  const renderTeamRows = () => {
    return teamData.map((team) => (
      <TableRow key={team.id}>
        <TableCell>{team.id}</TableCell>
        <TableCell>{team.name}</TableCell>
        <TableCell>{team.fantasyleagueid}</TableCell>
        <TableCell>{team.userid}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="p-4">
      <Table>
        <TableCaption>Fantasy League Teams</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Fantasy League ID</TableHead>
            <TableHead>User ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderTeamRows()}</TableBody>
      </Table>
      <div className="flex justify-center">
        <button
          onClick={() => handleDraftClick({ id: 3, name: "League" })}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start Draft
        </button>
        <Outlet />
      </div>
    </div>
  );
}
