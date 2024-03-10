import './App.scss'
import Delay from './Components/Delay/Delay'
import SendFile from './Components/SendFile/SendFile'
import Header from './Components/Header/Header';
import { getEnv } from './config/config';
import Chart from './Chart/Chart';
import { useState } from 'react';

function MainApp() {
    const config = getEnv();
    const [jsonData, setJsonData] = useState<object[]>([]);

    if (!config) {
        return;
    }

    return (
        <div>
            <Header {...config} />
            <div className='app'>
                <div className="widhter">
                    <div className="block">
                        <div className="container">
                            <SendFile
                                setJsonData={setJsonData}
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
            <Chart jsonData={jsonData} />
        </div>
    )
}

export default MainApp