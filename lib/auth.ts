import { createClient } from "@supabase/supabase-js"
// import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }

  redirect("/login")
}

export async function getSession() {
  // const cookieStore = cookies()
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function getUserProfile() {
  const session = await getSession()

  if (!session) {
    return null
  }

  const { data, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  })

  if (error) {
    throw error
  }

  return true
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    throw error
  }

  return true
}

