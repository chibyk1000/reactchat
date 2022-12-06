import Login from './pages/Login'
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import Protected from './components/Protected'
const App = () => {
    return (
      <Layout>
        <Routes>
            <Route path='/' element={ <Login/>} />
            <Route path='/signup' element={ <Signup/>} />
          <Route path='/chat' element={
            <Protected>

              <Chat />
            </Protected>
          
          
          } />
  </Routes>

      </Layout>
  )
}

export default App