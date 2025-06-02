interface LeagueData {
  id: number;
  name: string;
}

interface LeagueTableProps {
  leaguesData: LeagueData[];
  onLeagueClick: (league: LeagueData) => void;
}

export default function LeagueTable({
  leaguesData,
  onLeagueClick,
}: LeagueTableProps) {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="text-center">ID</th>
          <th className="text-center">Name</th>
        </tr>
      </thead>
      <tbody>
        {leaguesData.map((league) => (
          <tr
            key={league.id}
            onClick={() => onLeagueClick(league)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <td className="text-center">{league.id}</td>
            <td className="text-center">{league.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
