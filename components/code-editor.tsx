"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Loader2 } from "lucide-react"

interface CodeEditorProps {
  defaultLanguage?: string
  defaultValue?: string
  height?: string
  testCases?: {
    input: string
    expectedOutput: string
  }[]
  onRun?: (code: string) => Promise<{
    output: string
    passed: boolean
    error?: string
  }>
}

export function CodeEditor({
  defaultLanguage = "javascript",
  defaultValue = "// Write your code here\n",
  height = "400px",
  testCases = [],
  onRun,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [testResults, setTestResults] = useState<
    {
      passed: boolean
      output: string
      error?: string
    }[]
  >([])

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value)
    }
  }

  const handleRun = async () => {
    if (!onRun) return

    setIsRunning(true)
    setOutput("")
    setTestResults([])

    try {
      const result = await onRun(code)
      setOutput(result.output)

      // Run test cases
      const results = []
      for (const testCase of testCases) {
        // In a real implementation, you would run each test case
        // For now, we'll just simulate it
        results.push({
          passed: Math.random() > 0.3, // Simulate some passing and some failing
          output: `Input: ${testCase.input}\nExpected: ${testCase.expectedOutput}\nActual: ${Math.random() > 0.3 ? testCase.expectedOutput : "Different output"}`,
        })
      }
      setTestResults(results)

      setActiveTab("output")
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
            {testCases.length > 0 && <TabsTrigger value="tests">Test Cases</TabsTrigger>}
          </TabsList>
          <Button onClick={handleRun} disabled={isRunning} className="ml-auto">
            {isRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
            Run Code
          </Button>
        </div>

        <TabsContent value="editor" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Editor
                height={height}
                defaultLanguage={defaultLanguage}
                defaultValue={defaultValue}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                }}
                className="border rounded-md"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="output" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <pre className="bg-muted p-4 rounded-md overflow-auto whitespace-pre-wrap h-[400px]">
                {output || "Run your code to see the output here."}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4 h-[400px] overflow-auto">
                {testResults.length > 0 ? (
                  testResults.map((result, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Test Case {index + 1}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${result.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {result.passed ? "Passed" : "Failed"}
                        </span>
                      </div>
                      <pre className="bg-muted p-2 rounded-md text-sm overflow-auto whitespace-pre-wrap">
                        {result.output}
                      </pre>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">Run your code to see test results.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

