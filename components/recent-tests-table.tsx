import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function RecentTestsTable() {
  const recentTests = [
    {
      id: "1",
      name: "JavaScript Fundamentals",
      date: "2023-03-15",
      score: 85,
      status: "Completed",
    },
    {
      id: "2",
      name: "React Hooks",
      date: "2023-03-12",
      score: 92,
      status: "Completed",
    },
    {
      id: "3",
      name: "CSS Grid Layout",
      date: "2023-03-10",
      score: 78,
      status: "Completed",
    },
    {
      id: "4",
      name: "TypeScript Basics",
      date: "2023-03-05",
      score: 65,
      status: "Completed",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Test Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentTests.map((test) => (
          <TableRow key={test.id}>
            <TableCell className="font-medium">{test.name}</TableCell>
            <TableCell>{new Date(test.date).toLocaleDateString()}</TableCell>
            <TableCell>{test.score}%</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {test.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

