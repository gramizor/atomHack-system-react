import './App.scss'
import Delay from './Components/Delay/Delay'
import SendFile from './Components/SendFile/SendFile'
import Header from './Components/Header/Header';
import { getEnv } from './config/config';

function MainApp() {
    const config = getEnv();

    if (!config) {
        return;
    }

    return (
        <div>
            <Header />
            <div className='app'>
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
            </div >
        </div>
    )
}

export default MainApp