interface TeamData {
  id: number;
  name: string;
  fantasyleagueid: number;
  userid: number;
}

interface TeamTableProps {
  teamData: TeamData[];
  onTeamClick: (team: TeamData) => void;
}

export default function TeamTable({
  teamData,
  onTeamClick,
}: TeamTableProps) {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="text-center">ID</th>
          <th className="text-center">Name</th>
        </tr>
      </thead>
      <tbody>
        {teamData.map((team) => (
          <tr
            key={team.id}
            onClick={() => onTeamClick(team)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <td className="text-center">{team.id}</td>
            <td className="text-center">{team.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
