'use client'
import AppLayout from '../components/AppLayout'

export default function CitizenLayout({ children }) {
  return (
    <AppLayout 
      title="Citizen Portal"
      userType="citizen"
      userName="John Citizen"
      userRole="Applicant"
    >
      {children}
    </AppLayout>
  )
} 