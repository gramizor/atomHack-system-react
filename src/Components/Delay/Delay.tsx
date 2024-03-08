import { Button, NumberInput } from "@mantine/core"
import './Delay.scss'
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type Props = {}

function Delay({ }: Props) {
    const [delay, setDelay] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://delay.cry1s.ru/api/delay');
                const data = response.data;
                setDelay(data.delay);
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

    const sendDelay = async (delay: number) => {
        try {
            await axios.post(`http://delay.cry1s.ru/api/delay?delay=${delay}`);
        } catch (error) {
            console.error('Ошибка при отправке задержки:', error);
        }
    };

    const handleChange = (value: string | number) => {
        setDelay(typeof value === 'string' ? parseInt(value, 10) : value);
    };

    return (
        <div>
            <NumberInput
                label="Введите задержку"
                placeholder="Секунды"
                suffix=" сек"
                defaultValue={delay}
                onChange={handleChange}
            />
            <div style={{ marginTop: '5px' }}>
                <Button fullWidth onClick={() => sendDelay(delay)}>
                    Установить задержку
                </Button>
            </div>
        </div>
    );
};

export default Delay