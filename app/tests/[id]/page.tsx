"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, Clock, Loader2 } from "lucide-react"
import Link from "next/link"

export default function TestPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(900) // 15 minutes in seconds

  // Mock test data
  const test = {
    id: params.id,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    difficulty: "Beginner",
    timeLimit: "15 min",
    questions: [
      {
        id: "1",
        text: "Which of the following is NOT a JavaScript data type?",
        options: [
          { id: "a", text: "String" },
          { id: "b", text: "Boolean" },
          { id: "c", text: "Float" },
          { id: "d", text: "Number" },
        ],
        correctAnswer: "c",
      },
      {
        id: "2",
        text: "What will the following code return: console.log(typeof [])?",
        options: [
          { id: "a", text: "array" },
          { id: "b", text: "object" },
          { id: "c", text: "undefined" },
          { id: "d", text: "null" },
        ],
        correctAnswer: "b",
      },
      {
        id: "3",
        text: "Which method is used to add an element to the end of an array?",
        options: [
          { id: "a", text: "push()" },
          { id: "b", text: "pop()" },
          { id: "c", text: "shift()" },
          { id: "d", text: "unshift()" },
        ],
        correctAnswer: "a",
      },
      {
        id: "4",
        text: "What is the correct way to create a function in JavaScript?",
        options: [
          { id: "a", text: "function = myFunction() {}" },
          { id: "b", text: "function:myFunction() {}" },
          { id: "c", text: "function myFunction() {}" },
          { id: "d", text: "create myFunction() {}" },
        ],
        correctAnswer: "c",
      },
      {
        id: "5",
        text: "Which operator is used for strict equality comparison?",
        options: [
          { id: "a", text: "==" },
          { id: "b", text: "===" },
          { id: "c", text: "=" },
          { id: "d", text: "!==" },
        ],
        correctAnswer: "b",
      },
    ],
  }

  const handleAnswerSelect = (questionIndex: number, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerId,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitTest = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Calculate score
      const correctAnswers = test.questions.filter((q, index) => selectedAnswers[index] === q.correctAnswer).length

      const score = Math.round((correctAnswers / test.questions.length) * 100)

      toast({
        title: "Test Completed!",
        description: `Your score: ${score}%. You got ${correctAnswers} out of ${test.questions.length} questions correct.`,
      })

      setTestCompleted(true)
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100

  if (testCompleted) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Test Completed" text="View your results below." />

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{test.title} - Results</CardTitle>
            <CardDescription>You have completed this test.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-2 py-8">
              <div className="text-5xl font-bold">
                {Math.round(
                  (Object.keys(selectedAnswers).filter(
                    (key) =>
                      selectedAnswers[Number.parseInt(key)] === test.questions[Number.parseInt(key)].correctAnswer,
                  ).length /
                    test.questions.length) *
                    100,
                )}
                %
              </div>
              <p className="text-muted-foreground">
                You got{" "}
                {
                  Object.keys(selectedAnswers).filter(
                    (key) =>
                      selectedAnswers[Number.parseInt(key)] === test.questions[Number.parseInt(key)].correctAnswer,
                  ).length
                }{" "}
                out of {test.questions.length} questions correct
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Question Breakdown</h3>
              {test.questions.map((question, index) => (
                <div key={question.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={selectedAnswers[index] === question.correctAnswer ? "outline" : "destructive"}
                      className={
                        selectedAnswers[index] === question.correctAnswer
                          ? "bg-green-50 text-green-700 border-green-200"
                          : ""
                      }
                    >
                      Question {index + 1}
                    </Badge>
                    <span className="text-sm font-medium">{question.text}</span>
                  </div>
                  <div className="pl-8 text-sm">
                    <p>
                      Your answer:{" "}
                      {question.options.find((opt) => opt.id === selectedAnswers[index])?.text || "Not answered"}
                    </p>
                    <p className="text-green-600">
                      Correct answer: {question.options.find((opt) => opt.id === question.correctAnswer)?.text}
                    </p>
                  </div>
                </div>
              ))}
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
      <DashboardHeader heading={test.title} text={test.description}>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {test.difficulty}
          </Badge>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </DashboardHeader>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Question {currentQuestion + 1} of {test.questions.length}
            </CardTitle>
            <Progress value={progress} className="w-1/3" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg font-medium">{test.questions[currentQuestion].text}</div>

          <RadioGroup
            value={selectedAnswers[currentQuestion]}
            onValueChange={(value) => handleAnswerSelect(currentQuestion, value)}
          >
            {test.questions[currentQuestion].options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentQuestion < test.questions.length - 1 ? (
            <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestion]}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmitTest} disabled={isSubmitting || !selectedAnswers[currentQuestion]}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Test
            </Button>
          )}
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}

