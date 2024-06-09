import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthorizedGists = async () => {
  try {
    const response = await axios.get("https://api.github.com/gists", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllPublicGists = async () => {
  try {
    const response = await axios.get("https://api.github.com/gists/public", {
      headers: {
        Accept: "application/vnd.github+json"
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getPaginatedPublicGists = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(
      `https://api.github.com/gists/public?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Accept: "application/vnd.github+json"
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getGistById = async (id: string) => {
  try {
    const response = await axios.get(`https://api.github.com/gists/${id}`, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getRateLimit = async () => {
  try {
    const response = await axios.get("https://api.github.com/rate_limit", {
      headers: {
        Accept: "application/vnd.github+json"
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
