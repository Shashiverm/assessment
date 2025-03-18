import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Medal } from "lucide-react"

export default function LeaderboardPage() {
  const users = [
    {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      points: 3250,
      rank: 1,
      badges: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Jane Smith",
      username: "janesmith",
      points: 2980,
      rank: 2,
      badges: 10,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Mike Johnson",
      username: "mikejohnson",
      points: 2750,
      rank: 3,
      badges: 9,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Sarah Williams",
      username: "sarahwilliams",
      points: 2500,
      rank: 4,
      badges: 8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "David Brown",
      username: "davidbrown",
      points: 2350,
      rank: 5,
      badges: 7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "Emily Davis",
      username: "emilydavis",
      points: 2200,
      rank: 6,
      badges: 6,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      name: "Robert Wilson",
      username: "robertwilson",
      points: 2100,
      rank: 7,
      badges: 6,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      name: "Lisa Taylor",
      username: "lisataylor",
      points: 1950,
      rank: 8,
      badges: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "9",
      name: "James Anderson",
      username: "jamesanderson",
      points: 1800,
      rank: 9,
      badges: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "10",
      name: "Patricia Thomas",
      username: "patriciathomas",
      points: 1750,
      rank: 10,
      badges: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Leaderboard" text="See how you rank against other users.">
        <Button variant="outline">My Rank: #42</Button>
      </DashboardHeader>

      <Tabs defaultValue="global" className="space-y-4">
        <TabsList>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>Top performers across all time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8">
                        {user.rank <= 3 ? (
                          <Medal
                            className={`h-6 w-6 ${
                              user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-gray-400" : "text-amber-700"
                            }`}
                          />
                        ) : (
                          <span className="text-lg font-bold text-muted-foreground">{user.rank}</span>
                        )}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{user.points.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Points</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{user.badges}</p>
                        <p className="text-sm text-muted-foreground">Badges</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Leaderboard</CardTitle>
              <CardDescription>Top performers this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Monthly leaderboard data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Leaderboard</CardTitle>
              <CardDescription>Top performers this week.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Weekly leaderboard data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Friends Leaderboard</CardTitle>
              <CardDescription>See how you rank among your friends.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Connect with friends to see your ranking</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Badges</CardTitle>
            <CardDescription>Most prestigious badges on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                  <span className="text-yellow-600 font-bold">1K</span>
                </div>
                <div>
                  <p className="font-medium">1000 Points Club</p>
                  <p className="text-sm text-muted-foreground">Earned by 124 users</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-purple-600 font-bold">🏆</span>
                </div>
                <div>
                  <p className="font-medium">Test Master</p>
                  <p className="text-sm text-muted-foreground">Earned by 56 users</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-blue-600 font-bold">💯</span>
                </div>
                <div>
                  <p className="font-medium">Perfect Score</p>
                  <p className="text-sm text-muted-foreground">Earned by 32 users</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Achievements</CardTitle>
            <CardDescription>Badges and achievements you've earned.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <span className="text-green-600 font-bold">🚀</span>
                </div>
                <div>
                  <p className="font-medium">Quick Learner</p>
                  <p className="text-sm text-muted-foreground">Completed 5 tests in one day</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-orange-600 font-bold">🔥</span>
                </div>
                <div>
                  <p className="font-medium">On Fire</p>
                  <p className="text-sm text-muted-foreground">7-day study streak</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-gray-600 font-bold">🧠</span>
                </div>
                <div>
                  <p className="font-medium">Knowledge Seeker</p>
                  <p className="text-sm text-muted-foreground">Attempted tests in 5 different categories</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Points History</CardTitle>
            <CardDescription>Your points earned over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Points history chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

