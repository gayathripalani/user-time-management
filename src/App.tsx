import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import Layout from './components/common/Layout'
import Login from './components/Login'
import TimeEntryForm from './components/user/TimeEntryForm'
import AddTimeSheet from './components/user/AddTimeSheet'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
          <Routes >
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<TimeEntryForm />} />
            <Route path="/add-timesheet" element={<AddTimeSheet />} />
          </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
