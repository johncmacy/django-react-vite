import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="container mt-8">
      <h1>Colors</h1>
      <Outlet />
    </div>
  )
}
