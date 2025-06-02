import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from '@tanstack/react-router';
import {Card} from "../components/ui/card";
import LeagueTable from '@/components/ui/league-table';

interface LeagueData {
  id: number;
  name: string;
}

export default function AllLeaguesPage() {
  const [leaguesData, setLeaguesData] = useState<LeagueData[] | null>(null);
  const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://localhost:5097/api/fantasyleague' + "/by-user/1")
      .then(response => {
        setLeaguesData(response.data);
        console.log(response)
      })
      .catch(error => console.error(error));
    }, []);

    const handleLeagueClick = (league: LeagueData) => {
          navigate({ to: `/league/${league.id}/${league.name}` });
    }

  return (
    <div className="p-8 flex flex-col justify-center items-center">
      {leaguesData && (
        <Card>
        <LeagueTable
          leaguesData={leaguesData}
          onLeagueClick={handleLeagueClick}
        />
        </Card>
      )}
      <button className="mt-4">Create League</button>
    </div>
  );
}
  