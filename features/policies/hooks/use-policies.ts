"use client"

import { useGetQuery } from "@/core/hooks/queries-actions"

export interface Policy {
  key: string
  name: string
  title: string
  content: string
  updated_at: string
}

export function usePolicies() {
  return useGetQuery<Policy[]>({
    url: "policies",
    key: ["policies"],
  })
}

export function usePolicyByKey(key: string) {
  return useGetQuery<Policy>({
    url: `policies/${key}`,
    key: ["policy", key],
  })
}
