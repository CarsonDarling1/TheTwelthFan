interface User {
  id: number; // This represents the FantasyTeamId
  pickNumber: number;
  name: string;
  userid: number;
}

interface PickListProps {
  userList: User[];
  className?: string;
  currentTeamId: number;
}

export default function PickList({
  userList,
  className = '',
  currentTeamId,
}: PickListProps) {
  console.log("users: ", userList);
  return (
    <table className={`w-full table-auto ${className}`}>
      <thead>
        <tr>
          <th className="border-b text-center">Pick</th>
          <th className="border-b text-center">Name</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => {
          const isCurrent = user.id === currentTeamId;

          return (
            <tr
              key={user.id}
              className={`cursor-pointer text-center ${
                isCurrent ? 'bg-yellow-200 font-semibold' : 'hover:bg-gray-100'
              }`}
            >
              <td className="border-b">{user.pickNumber}</td>
              <td className="border-b">{user.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
