import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import MainApp from './MainApp'; // Исправлено: MainApp вместо mainApp

function App() {
  return (
    <>
      <MantineProvider>
        <Notifications />
        <MainApp />
      </MantineProvider>
    </>
  )
}

export default App;
