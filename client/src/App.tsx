import { BrowserRouter } from 'react-router-dom'
import UserRoutes from './routes/userRoutes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserRoutes />
    </BrowserRouter>
  )
}

export default App