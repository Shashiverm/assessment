"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, BookOpen, CheckCircle, Clock, Code, FileText, Trophy, Users } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentTestsTable } from "@/components/recent-tests-table"
import { DashboardStats } from "@/components/dashboard-stats"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View your progress and manage your tests.">
        <Link href="/tests/create">
          <Button>Create Test</Button>
        </Link>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <DashboardStats />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tests Taken</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#42</div>
                <p className="text-xs text-muted-foreground">+12 positions from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tests Created</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Tests</CardTitle>
                <CardDescription>Your recent test attempts and their scores.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTestsTable />
              </CardContent>
              <CardFooter>
                <Link href="/tests/history">
                  <Button variant="outline">View All</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recommended Tests</CardTitle>
                <CardDescription>Based on your skills and interests.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">JavaScript Fundamentals</p>
                      <p className="text-sm text-muted-foreground">Test your knowledge of JavaScript basics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">React Hooks</p>
                      <p className="text-sm text-muted-foreground">Advanced React hooks and patterns</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Data Structures</p>
                      <p className="text-sm text-muted-foreground">Common data structures and algorithms</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/tests/recommended">
                  <Button variant="outline">View All</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Your test performance over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Performance chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Breakdown</CardTitle>
                <CardDescription>Your performance by skill category.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Skill breakdown chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Time Spent</CardTitle>
                <CardDescription>Average time spent on different test types.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Time spent chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>My Tests</CardTitle>
                <CardDescription>Tests you have created.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">JavaScript Basics</p>
                    <p className="text-xs text-muted-foreground">42 attempts</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">React Components</p>
                    <p className="text-xs text-muted-foreground">28 attempts</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">CSS Grid Layout</p>
                    <p className="text-xs text-muted-foreground">15 attempts</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/tests/my-tests">
                  <Button variant="outline">Manage Tests</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Popular Tests</CardTitle>
                <CardDescription>Most popular tests on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">JavaScript Interview Questions</p>
                    <p className="text-xs text-muted-foreground">1.2k attempts</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">React Hooks Mastery</p>
                    <p className="text-xs text-muted-foreground">856 attempts</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Data Structures 101</p>
                    <p className="text-xs text-muted-foreground">723 attempts</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/tests/popular">
                  <Button variant="outline">View All</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Recent test activity on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      <span className="font-medium">John Doe</span> completed JavaScript Basics
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      <span className="font-medium">Jane Smith</span> created a new test
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      <span className="font-medium">Mike Johnson</span> reached #1 on the leaderboard
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/activity">
                  <Button variant="outline">View All</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

