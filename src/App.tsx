import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import Layout from './components/common/Layout'
import Login from './components/Login'
import TimeSheet from './components/TimeSheet'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
          <Routes >
            <Route path="/" element={<Login />} />
            <Route path="/timesheet" element={<TimeSheet />} />
          </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
