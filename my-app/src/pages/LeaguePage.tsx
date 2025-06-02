import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from "../components/ui/table";

interface TeamData {
  id: number;
  name: string;
  fantasyleagueid: number;
  userid: number;
}

export default function LeaguePage() {
  const [teamData, setTeamData] = useState<TeamData[]>([]);

useEffect(() => {
  const token = localStorage.getItem("authToken");
  
  if (!token) {
    console.warn("No token found in localStorage");
    return;
  }

  axios.get('http://localhost:5097/api/fantasyteam/get-league-teams/1', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      setTeamData(response.data);
    })
    .catch(error => {
      console.error('Error fetching team data:', error);
    });
}, []);

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
        <TableBody>
          {renderTeamRows()}
        </TableBody>
      </Table>
    </div>
  );
}
