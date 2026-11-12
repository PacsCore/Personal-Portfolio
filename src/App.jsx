import { MotionConfig } from 'framer-motion'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout.jsx'
import content from './data/content.js'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import './App.css'

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage />, handle: { title: content.sectionTitles.about } },
      { path: '/projects', element: <ProjectsPage />, handle: { title: content.sectionTitles.projects } },
      { path: '/contact', element: <ContactPage />, handle: { title: content.sectionTitles.contact } },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}

export default App
