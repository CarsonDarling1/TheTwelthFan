import { useSearch } from "@tanstack/react-router";
import ScrollContainer from "../components/ui/scroll-container";
import { dashboardRoute } from "../routes"; // Make sure this import is correct!

import {    
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from "../components/ui/table";

// Sample NFL Player Stats Data
const nflPlayerStats = [
  {
    name: "Patrick Mahomes",
    team: "Kansas City Chiefs",
    position: "QB",
    passingYards: 4500,
    passingTouchdowns: 38,
    interceptions: 12,
    rushingYards: 300,
    rushingTouchdowns: 2,
  },
  {
    name: "Josh Allen",
    team: "Buffalo Bills",
    position: "QB",
    passingYards: 4200,
    passingTouchdowns: 35,
    interceptions: 10,
    rushingYards: 700,
    rushingTouchdowns: 8,
  },
  {
    name: "Micah Parsons",
    team: "Dallas Cowboys",
    position: "LB",
    tackles: 80,
    sacks: 13,
    interceptions: 2,
    forcedFumbles: 4,
  }
];

const newsData = [
    { Name: "Good News", Content: "Lakers and Dodgers are terrible"},
    { Name: "LA sport in shambles", Content:"Everyone approves"}
]

// Get all unique stats dynamically
const statKeys = Array.from(
  new Set(nflPlayerStats.flatMap(player => Object.keys(player)))
).filter(key => key !== "name" && key !== "team" && key !== "position");

export default function DashboardPage() {
  const searchParams = useSearch({ from: dashboardRoute.id });

  const renderPlayerRows = () => {
    return nflPlayerStats.map((player) => (
      <TableRow key={player.name}>
        <TableCell>{player.name}</TableCell>
        <TableCell>{player.team}</TableCell>
        <TableCell>{player.position}</TableCell>
        {statKeys.map((stat) => (
        <TableCell key={stat}>{player[stat as keyof typeof player] ?? "-"}</TableCell>
      ))}
      </TableRow>
    ));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center top-1">
      {searchParams.fromLogin && (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
          <p>You have successfully logged in.</p>
        </div>
      )}

        <div className="text-3xl mb-4 mt-16">Top Stories</div>
        <ScrollContainer cardData={newsData} className="mb-10" />
        <Table>
          <TableCaption>NFL Player Stats</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Position</TableHead>
              {statKeys.map((stat) => (
                <TableHead key={stat}>{stat.replace(/([A-Z])/g, " $1")}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderPlayerRows()}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
