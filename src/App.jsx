import { Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import PostsPage from './pages/PostsPage.jsx'
import PostDetailsPage from './pages/PostDetailsPage.jsx'
import TodosPage from './pages/TodosPage.jsx'
import TodoDetailsPage from './pages/TodoDetailsPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import UserDetailsPage from './pages/UserDetailsPage.jsx'

function NavItem({ to, children }) {
  return (
    <>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          ['navLink', isActive ? 'navLinkActive' : ''].filter(Boolean).join(' ')
        }
      >
        {children}
      </NavLink>
    </>
  )
}

function AppFrame() {
  return (
    <>
      <div className="appShell">
        <header className="appHeader">
          <nav className="nav">
            <NavItem to="/users">Users</NavItem>
            <NavItem to="/posts">Posts</NavItem>
            <NavItem to="/todos">Todos</NavItem>
          </nav>
        </header>

        <main className="appMain">
          <Outlet />
        </main>
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppFrame />}>
          <Route index element={<Navigate to="/users" replace />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserDetailsPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/:id" element={<PostDetailsPage />} />
          <Route path="todos" element={<TodosPage />} />
          <Route path="todos/:id" element={<TodoDetailsPage />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
