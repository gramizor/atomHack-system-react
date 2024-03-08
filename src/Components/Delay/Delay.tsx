import { Button, NumberInput } from "@mantine/core"
import { Config } from "../../config/types";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import './Delay.scss'

function Delay({ DELAY_SERVICE_HOST } : Config) {
    const [delay, setDelay] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${DELAY_SERVICE_HOST}/api/delay`);
                const data = response.data;
                setDelay(data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error('Ошибка при получении задержки:', error.message);
                } else {
                    console.error('Ошибка при получении задержки:', error);
                }
            }
        };
        fetchData();
    }, []);

    const sendDelay = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await axios.post(`${DELAY_SERVICE_HOST}/api/delay?delay=${delay}`);
        } catch (error) {
            console.error('Ошибка при отправке задержки:', error);
        }
    };

    const handleChange = (value: string | number) => {
        if (typeof value === "string") {
            return;
        }
        
        setDelay(value);
    };

    return (
        <form id="delayForm" onSubmit={sendDelay}>
            <NumberInput
                label="Настройка задержки"
                placeholder="Секунды"
                suffix=" сек"
                defaultValue={delay}
                onChange={handleChange}
            />
            <div style={{ marginTop: '5px' }}>
                <Button fullWidth type="submit">
                    Установить задержку
                </Button>
            </div>
        </form>
    );
};

export default Delay