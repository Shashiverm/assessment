"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { CodeEditor } from "@/components/code-editor"
import { Clock } from "lucide-react"
import Link from "next/link"

export default function CodingChallengePage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [challengeCompleted, setChallengeCompleted] = useState(false)

  // Mock coding challenge data
  const challenge = {
    id: params.id,
    title: "Two Sum Problem",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Medium",
    timeLimit: "30 min",
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Example usage:
// twoSum([2, 7, 11, 15], 9) should return [0, 1]
// twoSum([3, 2, 4], 6) should return [1, 2]
`,
    testCases: [
      {
        input: "[2, 7, 11, 15], 9",
        expectedOutput: "[0, 1]",
      },
      {
        input: "[3, 2, 4], 6",
        expectedOutput: "[1, 2]",
      },
      {
        input: "[3, 3], 6",
        expectedOutput: "[0, 1]",
      },
    ],
  }

  const handleRunCode = async (code: string) => {
    // In a real implementation, this would send the code to a backend service
    // that would execute it safely and return the result

    // For now, we'll just simulate a delay and return a mock result
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      output: "Running twoSum([2, 7, 11, 15], 9)...\nResult: [0, 1]\n\nRunning twoSum([3, 2, 4], 6)...\nResult: [1, 2]",
      passed: true,
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Solution submitted!",
        description: "Your solution has been submitted successfully.",
      })

      setChallengeCompleted(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (challengeCompleted) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Challenge Completed" text="View your results below." />

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{challenge.title} - Results</CardTitle>
            <CardDescription>You have completed this coding challenge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-2 py-8">
              <div className="text-5xl font-bold">100%</div>
              <p className="text-muted-foreground">All test cases passed! Great job!</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/tests">
              <Button variant="outline">Back to Tests</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </CardFooter>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={challenge.title} text="Solve the coding challenge below.">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {challenge.difficulty}
          </Badge>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{challenge.timeLimit}</span>
          </div>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Problem Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{challenge.description}</p>

            <div className="space-y-2">
              <h3 className="font-medium">Examples:</h3>
              <div className="space-y-2">
                {challenge.testCases.map((testCase, index) => (
                  <div key={index} className="bg-muted p-2 rounded-md">
                    <p className="text-sm font-mono">Input: {testCase.input}</p>
                    <p className="text-sm font-mono">Output: {testCase.expectedOutput}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
              Submit Solution
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Code Editor</CardTitle>
            <CardDescription>Write your solution in JavaScript.</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeEditor
              defaultLanguage="javascript"
              defaultValue={challenge.starterCode}
              testCases={challenge.testCases}
              onRun={handleRunCode}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

