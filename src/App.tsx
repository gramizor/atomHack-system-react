import '@mantine/core/styles.css';
import './App.scss'
import Delay from './Components/Delay/Delay'
import { MantineProvider } from '@mantine/core'
import SendFile from './Components/SendFile/SendFile'
import { getEnv } from './config/config';

function App() {
  const config = getEnv();

  if (!config) {
    return;
  }

  return (
    <>
      <div className='app'>
        <MantineProvider>
          <div className="widhter">
            <div className="block">
              <div className="container">
                <SendFile
                  {...config}
                />
              </div>
              <div className="container">
                <Delay
                  {...config}
                />
              </div>
            </div>
          </div>
        </MantineProvider>
      </div >
    </>
  )
}

export default App
