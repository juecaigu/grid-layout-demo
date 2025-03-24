import './App.less'
import Layout from './Layout/Layout'

function App() {
  return (
    <div className='gld-area'>
      <div className='gld-area-left gld-area-part'>left part</div>
      <div className='gld-area-main gld-area-part'>
        <Layout />
      </div>
      <div className='gld-area-right gld-area-part'>right part</div>
    </div>
  )
}

export default App
