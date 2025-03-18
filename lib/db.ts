import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

  if (error) {
    console.error("Error fetching user:", error)
    return null
  }

  return data
}

export async function createUser(userData: {
  email: string
  name: string
  password: string
}) {
  const { data, error } = await supabase.from("users").insert([userData]).select()

  if (error) {
    console.error("Error creating user:", error)
    throw error
  }

  return data[0]
}

export async function getTestById(id: string) {
  const { data, error } = await supabase.from("tests").select("*, questions(*)").eq("id", id).single()

  if (error) {
    console.error("Error fetching test:", error)
    return null
  }

  return data
}

export async function getTestsByCategory(category: string) {
  const { data, error } = await supabase.from("tests").select("*").eq("category", category)

  if (error) {
    console.error("Error fetching tests by category:", error)
    return []
  }

  return data
}

export async function createTest(testData: any) {
  const { data, error } = await supabase.from("tests").insert([testData]).select()

  if (error) {
    console.error("Error creating test:", error)
    throw error
  }

  return data[0]
}

export async function submitTestResult(resultData: {
  user_id: string
  test_id: string
  score: number
  answers: any
  completed_at: string
}) {
  const { data, error } = await supabase.from("test_results").insert([resultData]).select()

  if (error) {
    console.error("Error submitting test result:", error)
    throw error
  }

  return data[0]
}

export async function getLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, username, points, badges")
    .order("points", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching leaderboard:", error)
    return []
  }

  return data
}

export async function updateUserProfile(userId: string, profileData: any) {
  const { data, error } = await supabase.from("users").update(profileData).eq("id", userId).select()

  if (error) {
    console.error("Error updating user profile:", error)
    throw error
  }

  return data[0]
}

