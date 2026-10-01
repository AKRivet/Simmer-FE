/// <reference types="vite/client" />

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:5000'

export interface Recipe {
  id: string
  name: string
  cuisine: string
  prepTimeMinutes: number
  ingredients: string[]
  steps: string[]
}

export interface CreateRecipeRequest {
  name: string
  cuisine: string
  prepTimeMinutes: number
  ingredients: string[]
  steps: string[]
}

export interface ApiValidationError {
  title: string
  errors: Record<string, string[]>
}

export async function createRecipe(data: CreateRecipeRequest): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err: ApiValidationError = await res.json()
    throw err
  }

  return res.json() as Promise<Recipe>
}
