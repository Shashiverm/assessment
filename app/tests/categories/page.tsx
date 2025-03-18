import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Code, FileText } from "lucide-react"

export default function TestCategoriesPage() {
  const categories = [
    {
      id: "javascript",
      name: "JavaScript",
      description: "Test your JavaScript knowledge from basics to advanced concepts.",
      count: 24,
      icon: Code,
    },
    {
      id: "react",
      name: "React",
      description: "Master React concepts, hooks, state management, and more.",
      count: 18,
      icon: Code,
    },
    {
      id: "css",
      name: "CSS",
      description: "Test your CSS skills including layouts, animations, and responsive design.",
      count: 12,
      icon: FileText,
    },
    {
      id: "html",
      name: "HTML",
      description: "Validate your HTML knowledge from basic tags to semantic markup.",
      count: 8,
      icon: FileText,
    },
    {
      id: "nodejs",
      name: "Node.js",
      description: "Test your Node.js skills including Express, APIs, and database integration.",
      count: 15,
      icon: Code,
    },
    {
      id: "datastructures",
      name: "Data Structures",
      description: "Challenge yourself with common data structures and algorithms.",
      count: 10,
      icon: BookOpen,
    },
    {
      id: "typescript",
      name: "TypeScript",
      description: "Test your TypeScript knowledge from basics to advanced types.",
      count: 14,
      icon: Code,
    },
    {
      id: "python",
      name: "Python",
      description: "Validate your Python skills from syntax to advanced concepts.",
      count: 20,
      icon: Code,
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Test Categories" text="Browse tests by category.">
        <Link href="/tests">
          <Button variant="outline">Back to Tests</Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <Badge variant="outline">{category.count} tests</Badge>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{category.count} tests available</span>
              </div>
            </CardContent>
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
    </DashboardShell>
  )
}

