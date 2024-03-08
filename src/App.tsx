import '@mantine/core/styles.css';
import './App.scss'
import Delay from './Components/Delay/Delay'
import { Button, MantineProvider } from '@mantine/core'
import SendFile from './Components/SendFile/SendFile'

function App() {
  return (
    <>
      <div className='app'>
        <MantineProvider>
          <div className="widhter">
            <div className="block">
              <div className="container">
                <SendFile />
              </div>
              <div className="container">
                <Delay />
              </div>
            </div>
            <Button fullWidth >
              Отправить все данные
            </Button>
          </div>
        </MantineProvider>
      </div >
    </>
  )
}

export default App
