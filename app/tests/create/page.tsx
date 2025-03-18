"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CreateTestPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [testType, setTestType] = useState("mcq")
  const [testData, setTestData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    timeLimit: "",
    questions: [
      {
        text: "",
        options: [
          { id: "a", text: "" },
          { id: "b", text: "" },
          { id: "c", text: "" },
          { id: "d", text: "" },
        ],
        correctAnswer: "",
      },
    ],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedQuestions = [...testData.questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value }
    setTestData((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  const handleOptionChange = (questionIndex: number, optionId: string, value: string) => {
    const updatedQuestions = [...testData.questions]
    const optionIndex = updatedQuestions[questionIndex].options.findIndex((opt) => opt.id === optionId)
    updatedQuestions[questionIndex].options[optionIndex].text = value
    setTestData((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
    const updatedQuestions = [...testData.questions]
    updatedQuestions[questionIndex].correctAnswer = value
    setTestData((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  const addQuestion = () => {
    setTestData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          options: [
            { id: "a", text: "" },
            { id: "b", text: "" },
            { id: "c", text: "" },
            { id: "d", text: "" },
          ],
          correctAnswer: "",
        },
      ],
    }))
  }

  const removeQuestion = (index: number) => {
    if (testData.questions.length > 1) {
      const updatedQuestions = [...testData.questions]
      updatedQuestions.splice(index, 1)
      setTestData((prev) => ({ ...prev, questions: updatedQuestions }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!testData.title || !testData.category || !testData.difficulty) {
        throw new Error("Please fill in all required fields")
      }

      // Validate questions
      for (const question of testData.questions) {
        if (!question.text || !question.correctAnswer) {
          throw new Error("Please complete all questions and select correct answers")
        }
        for (const option of question.options) {
          if (!option.text) {
            throw new Error("Please fill in all answer options")
          }
        }
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Test created!",
        description: "Your test has been created successfully.",
      })

      // Redirect to tests page
      // window.location.href = "/tests"
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create Test" text="Create a new test for others to take." />

      <Tabs defaultValue="mcq" className="space-y-4" onValueChange={setTestType}>
        <TabsList>
          <TabsTrigger value="mcq">Multiple Choice</TabsTrigger>
          <TabsTrigger value="coding">Coding Challenge</TabsTrigger>
        </TabsList>

        <TabsContent value="mcq" className="space-y-4">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Test Details</CardTitle>
                <CardDescription>Provide basic information about your test.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Test Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={testData.title}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) => setTestData((prev) => ({ ...prev, category: value }))}
                      disabled={isLoading}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="nodejs">Node.js</SelectItem>
                        <SelectItem value="datastructures">Data Structures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={testData.description}
                    onChange={handleChange}
                    disabled={isLoading}
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      onValueChange={(value) => setTestData((prev) => ({ ...prev, difficulty: value }))}
                      disabled={isLoading}
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input
                      id="timeLimit"
                      name="timeLimit"
                      type="number"
                      min="1"
                      max="120"
                      value={testData.timeLimit}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </CardContent>

              <CardHeader>
                <CardTitle>Questions</CardTitle>
                <CardDescription>Add questions to your test.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {testData.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="space-y-4 p-4 border rounded-md relative">
                    <div className="absolute right-2 top-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(questionIndex)}
                        disabled={testData.questions.length <= 1 || isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove question</span>
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`question-${questionIndex}`}>Question {questionIndex + 1}</Label>
                      <Textarea
                        id={`question-${questionIndex}`}
                        name="text"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(questionIndex, e)}
                        disabled={isLoading}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Answer Options</Label>
                      <div className="grid gap-3">
                        {question.options.map((option) => (
                          <div key={option.id} className="flex items-center gap-2">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted">
                              {option.id.toUpperCase()}
                            </div>
                            <Input
                              value={option.text}
                              onChange={(e) => handleOptionChange(questionIndex, option.id, e.target.value)}
                              disabled={isLoading}
                              placeholder={`Option ${option.id.toUpperCase()}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`correct-answer-${questionIndex}`}>Correct Answer</Label>
                      <Select
                        onValueChange={(value) => handleCorrectAnswerChange(questionIndex, value)}
                        value={question.correctAnswer}
                        disabled={isLoading}
                      >
                        <SelectTrigger id={`correct-answer-${questionIndex}`}>
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a">Option A</SelectItem>
                          <SelectItem value="b">Option B</SelectItem>
                          <SelectItem value="c">Option C</SelectItem>
                          <SelectItem value="d">Option D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" className="w-full" onClick={addQuestion} disabled={isLoading}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href="/tests">
                  <Button variant="outline" disabled={isLoading}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Test
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="coding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coding Challenge</CardTitle>
              <CardDescription>Create a coding challenge for users to solve.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Coding challenge creation coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

