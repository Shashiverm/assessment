import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock } from "lucide-react"
import Link from "next/link"

export default function CategoryPage({ params }: { params: { id: string } }) {
  // Mock category data
  const categories = {
    javascript: {
      name: "JavaScript",
      description: "Test your JavaScript knowledge from basics to advanced concepts.",
    },
    react: {
      name: "React",
      description: "Master React concepts, hooks, state management, and more.",
    },
    css: {
      name: "CSS",
      description: "Test your CSS skills including layouts, animations, and responsive design.",
    },
    html: {
      name: "HTML",
      description: "Validate your HTML knowledge from basic tags to semantic markup.",
    },
    nodejs: {
      name: "Node.js",
      description: "Test your Node.js skills including Express, APIs, and database integration.",
    },
    datastructures: {
      name: "Data Structures",
      description: "Challenge yourself with common data structures and algorithms.",
    },
    typescript: {
      name: "TypeScript",
      description: "Test your TypeScript knowledge from basics to advanced types.",
    },
    python: {
      name: "Python",
      description: "Validate your Python skills from syntax to advanced concepts.",
    },
  }

  const category = categories[params.id as keyof typeof categories] || {
    name: "Unknown Category",
    description: "Category not found.",
  }

  // Mock tests data
  const tests = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics",
      difficulty: "Beginner",
      questions: 20,
      timeEstimate: "15 min",
      attempts: 1250,
      type: "mcq",
    },
    {
      id: "2",
      title: "Advanced JavaScript Concepts",
      description: "Deep dive into closures, prototypes, and more",
      difficulty: "Advanced",
      questions: 15,
      timeEstimate: "25 min",
      attempts: 856,
      type: "mcq",
    },
    {
      id: "3",
      title: "JavaScript Array Methods",
      description: "Test your knowledge of array methods",
      difficulty: "Intermediate",
      questions: 18,
      timeEstimate: "20 min",
      attempts: 723,
      type: "mcq",
    },
    {
      id: "4",
      title: "Two Sum Problem",
      description: "Solve the classic two sum algorithm problem",
      difficulty: "Medium",
      questions: 1,
      timeEstimate: "30 min",
      attempts: 542,
      type: "coding",
    },
    {
      id: "5",
      title: "JavaScript Promises",
      description: "Test your understanding of Promises and async/await",
      difficulty: "Intermediate",
      questions: 15,
      timeEstimate: "20 min",
      attempts: 612,
      type: "mcq",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading={category.name} text={category.description}>
        <Link href="/tests/categories">
          <Button variant="outline">All Categories</Button>
        </Link>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="mcq">Multiple Choice</TabsTrigger>
          <TabsTrigger value="coding">Coding Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {tests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{test.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        test.type === "coding"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }
                    >
                      {test.type === "coding" ? "Coding" : "MCQ"}
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
                      {test.type === "mcq" && <span className="text-muted-foreground">{test.questions} questions</span>}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{test.timeEstimate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">{test.attempts.toLocaleString()} attempts</div>
                  <Link href={test.type === "coding" ? `/tests/coding/${test.id}` : `/tests/${test.id}`}>
                    <Button>Take Test</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mcq" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {tests
              .filter((test) => test.type === "mcq")
              .map((test) => (
                <Card key={test.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{test.title}</CardTitle>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        MCQ
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

        <TabsContent value="coding" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {tests
              .filter((test) => test.type === "coding")
              .map((test) => (
                <Card key={test.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{test.title}</CardTitle>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Coding
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
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{test.timeEstimate}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">{test.attempts.toLocaleString()} attempts</div>
                    <Link href={`/tests/coding/${test.id}`}>
                      <Button>Take Test</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

