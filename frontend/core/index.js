import React, { createContext, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppIndex from './AppIndex'
import AppLayout from './AppLayout'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import EditColor from "./routes/EditColor"
import AddColor from "./routes/AddColor"

const queryClient = new QueryClient()

const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)

createRoot(
  document.getElementById('root')
).render(
  <QueryClientProvider client={queryClient}>

    <AppContext.Provider value={{}}>

      <Router basename="core">
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<AppIndex />} />

            <Route path="add" element={<AddColor />} />

            <Route path=":colorId">
              <Route path="edit" element={<EditColor />} />
            </Route>
          </Route>
        </Routes>
      </Router>

    </AppContext.Provider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
