'use client'
import AppLayout from '../components/AppLayout'

export default function VyaparaLayout({ children }) {
  return (
    <AppLayout 
      title="Vyapara License Management"
      userType="official"
      department="trade"
      userName="Trade Officer"
      userRole="License Officer"
    >
      {children}
    </AppLayout>
  )
} 