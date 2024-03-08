import '@mantine/core/styles.css';
import './App.scss'
import Delay from './Components/Delay/Delay'
import { Button, MantineProvider } from '@mantine/core'
import SendFile from './Components/SendFile/SendFile'
import { getEnv } from './config/config';

function App() {
  const config = getEnv();

  if (!config) {
    return;
  }

  const handleSubmitRequests = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const sendFileForm = document.getElementById("sendFileForm") as HTMLFormElement;
    const delayForm = document.getElementById("delayForm") as HTMLFormElement;

    if (sendFileForm && delayForm) {
      sendFileForm.dispatchEvent(new Event("submit", { cancelable: true }));
      delayForm.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };
  
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
            <Button fullWidth onClick={handleSubmitRequests}>
              Отправить все данные
            </Button>
          </div>
        </MantineProvider>
      </div >
    </>
  )
}

export default App
