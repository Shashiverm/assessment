import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Clock, Code, FileText, Search } from "lucide-react"

export default function TestsPage() {
  const testCategories = [
    {
      id: "1",
      name: "JavaScript",
      count: 24,
      icon: Code,
    },
    {
      id: "2",
      name: "React",
      count: 18,
      icon: Code,
    },
    {
      id: "3",
      name: "CSS",
      count: 12,
      icon: FileText,
    },
    {
      id: "4",
      name: "HTML",
      count: 8,
      icon: FileText,
    },
    {
      id: "5",
      name: "Node.js",
      count: 15,
      icon: Code,
    },
    {
      id: "6",
      name: "Data Structures",
      count: 10,
      icon: BookOpen,
    },
  ]

  const popularTests = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics",
      difficulty: "Beginner",
      questions: 20,
      timeEstimate: "15 min",
      attempts: 1250,
      category: "JavaScript",
    },
    {
      id: "2",
      title: "React Hooks Mastery",
      description: "Advanced React hooks and patterns",
      difficulty: "Intermediate",
      questions: 15,
      timeEstimate: "20 min",
      attempts: 856,
      category: "React",
    },
    {
      id: "3",
      title: "CSS Grid & Flexbox",
      description: "Modern CSS layout techniques",
      difficulty: "Intermediate",
      questions: 18,
      timeEstimate: "25 min",
      attempts: 723,
      category: "CSS",
    },
    {
      id: "4",
      title: "Data Structures 101",
      description: "Common data structures and algorithms",
      difficulty: "Advanced",
      questions: 25,
      timeEstimate: "30 min",
      attempts: 542,
      category: "Data Structures",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Tests" text="Browse, search, and take tests.">
        <div className="flex gap-2">
          <Link href="/tests/categories">
            <Button variant="outline">Browse Categories</Button>
          </Link>
          <Link href="/tests/create">
            <Button>Create Test</Button>
          </Link>
        </div>
      </DashboardHeader>

      <div className="flex items-center space-x-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search tests..." className="max-w-sm" />
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="my-tests">My Tests</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <category.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>{category.count} tests</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Link href={`/tests/category/${category.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Browse Tests
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold tracking-tight mt-8">Popular Tests</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {popularTests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{test.title}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {test.category}
                    </Badge>
                  </div>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-2">
                        {test.difficulty}
                      </Badge>
                      <span className="text-muted-foreground">{test.questions} questions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{test.timeEstimate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">{test.attempts.toLocaleString()} attempts</div>
                  <Link href={`/tests/${test.id}`}>
                    <Button>Take Test</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Tests</CardTitle>
              <CardDescription>Tests you have created or taken.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">You haven't created any tests yet</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/tests/create">
                <Button>Create Your First Test</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Tests</CardTitle>
              <CardDescription>Based on your skills and interests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Complete more tests to get personalized recommendations</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Tests</CardTitle>
              <CardDescription>Tests you have saved for later.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">You haven't bookmarked any tests yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

