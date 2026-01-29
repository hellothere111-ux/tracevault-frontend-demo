import { createFileRoute } from '@tanstack/react-router'
import { PhishingTraining } from '../../../features/phishing-training'

export const Route = createFileRoute('/_authenticated/phishing-training/')({
  component: PhishingTraining,
})
