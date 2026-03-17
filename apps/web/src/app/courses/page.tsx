import type { Metadata } from 'next'
import CoursesClient from './CoursesClient'

export const metadata: Metadata = {
  title: 'All Courses — AIsprint',
  description:
    "Browse AIsprint's AI education programs. 1:1 live mentorship in Machine Learning, AI, and Prompt Engineering.",
}

export default function CoursesPage() {
  return <CoursesClient />
}