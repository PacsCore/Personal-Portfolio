import { MotionConfig } from 'framer-motion'
import { Navigate, RouterProvider, createBrowserRouter, useParams } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout.jsx'
import content, { getProject } from './data/content.js'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import WorkPage from './pages/WorkPage.jsx'
import './styles/tokens.css'
import './styles/fonts.css'
import './App.css'

function LegacyProjectRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/work/${slug}`} replace />
}

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage />, handle: { title: content.about.title } },
      { path: '/work', element: <WorkPage />, handle: { title: content.work.title } },
      {
        path: '/work/:slug',
        element: <ProjectPage />,
        handle: { title: (params) => getProject(params.slug)?.title },
      },
      { path: '/contact', element: <ContactPage />, handle: { title: content.contact.title } },
      { path: '/projects', element: <Navigate to="/work" replace /> },
      { path: '/projects/:slug', element: <LegacyProjectRedirect /> },
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
