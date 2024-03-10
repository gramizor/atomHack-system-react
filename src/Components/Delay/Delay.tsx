import { Button, NumberInput, rem } from "@mantine/core";
import { Config } from "../../config/types";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IconX, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import './Delay.scss';

function Delay({ DELAY_SERVICE_HOST }: Config) {
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
    const [delay, setDelay] = useState<number>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${DELAY_SERVICE_HOST}/api/delay`);
                const data = response.data;
                setDelay(data);
                notifications.show({
                    title: 'Успешно!',
                    message: 'Задержка получена',
                    icon: checkIcon,
                    color: 'teal',
                    withCloseButton: true,
                    autoClose: 5000,
                })
            } catch (error) {
                if (error instanceof AxiosError) {
                    notifications.show({
                        title: 'Ошибка!',
                        message: 'Не удалось получить задержку',
                        icon: xIcon,
                        color: 'red',
                        withCloseButton: true,
                        autoClose: 5000,
                    })
                } else {
                    console.error('Ошибка при получении задержки:', error);
                }
            }
        };
        fetchData();
    }, [DELAY_SERVICE_HOST]);

    const sendDelay = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await axios.post(`${DELAY_SERVICE_HOST}/api/delay?delay=${delay}`);
            notifications.show({
                title: 'Успешно!',
                message: 'Задержка установлена',
                icon: checkIcon,
                color: 'teal',
                withCloseButton: true,
                autoClose: 5000,
            })
        } catch (error) {
            console.error('Ошибка при отправке задержки:', error);
            notifications.show({
                title: 'Ошибка!',
                message: 'Не удалось отправить задержку',
                icon: xIcon,
                color: 'red',
                withCloseButton: true,
                autoClose: 5000,
            })
        }
    };

    const handleChange = (value: string | number) => {
        if (typeof value === "number") {
            setDelay(value);
        }
    };

    return (
        <form id="delayForm" onSubmit={sendDelay}>
            <NumberInput
                label="Настройка задержки между марсом и землей"
                placeholder="Секунды"
                suffix=" сек"
                value={delay}
                onChange={handleChange}
            />
            <div style={{ margin: '5px 0' }}>
                <Button fullWidth type="submit">
                    Установить задержку
                </Button>
            </div>
        </form>
    );
};

export default Delay;
