import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import Layout from './components/common/Layout'
import Login from './components/Login'
import TimeEntryForm from './components/user/TimeEntryForm'
import Home from './components/user/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
          <Routes >
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add-timesheet/:taskDate" element={<TimeEntryForm />} />
          </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
