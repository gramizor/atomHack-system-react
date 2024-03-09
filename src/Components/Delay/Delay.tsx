import { Button, NumberInput, Notification, rem } from "@mantine/core";
import { Config } from "../../config/types";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IconX, IconCheck } from '@tabler/icons-react';

import './Delay.scss';

function Delay({ DELAY_SERVICE_HOST }: Config) {
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
    const [delay, setDelay] = useState<number>();
    const [notification, setNotification] = useState<React.ReactNode | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${DELAY_SERVICE_HOST}/api/delay`);
                const data = response.data;
                setDelay(data);
                showNotification(
                    <Notification
                        icon={checkIcon}
                        color="teal"
                        title="Успешно!"
                        mt="md"
                        closeButtonProps={{ 'aria-label': 'Hide notification' }}
                        onClose={() => setNotification(null)} // Добавляем обработчик закрытия уведомления
                    >
                        Задержка получена
                    </Notification>
                );
            } catch (error) {
                if (error instanceof AxiosError) {
                    showNotification(
                        <Notification
                            icon={xIcon}
                            color="red"
                            title="Ошибка"
                            mt="md"
                            closeButtonProps={{ 'aria-label': 'Hide notification' }}
                            onClose={() => setNotification(null)} // Добавляем обработчик закрытия уведомления
                        >
                            Не удалось получить задержку
                        </Notification>
                    );
                } else {
                    console.error('Ошибка при получении задержки:', error);
                }
            }
        };
        fetchData();
    }, [DELAY_SERVICE_HOST]);

    const showNotification = (notification: React.ReactNode) => {
        setNotification(notification);
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    const sendDelay = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await axios.post(`${DELAY_SERVICE_HOST}/api/delay?delay=${delay}`);
            showNotification(
                <Notification
                    icon={checkIcon}
                    color="teal"
                    title="Успешно!"
                    mt="md"
                    closeButtonProps={{ 'aria-label': 'Hide notification' }}
                    onClose={() => setNotification(null)} // Добавляем обработчик закрытия уведомления
                >
                    Задержка установлена
                </Notification>
            );
        } catch (error) {
            console.error('Ошибка при отправке задержки:', error);
            showNotification(
                <Notification
                    icon={xIcon}
                    color="red"
                    mt="md"
                    title="Ошибка"
                    closeButtonProps={{ 'aria-label': 'Hide notification' }}
                    onClose={() => setNotification(null)} // Добавляем обработчик закрытия уведомления
                >
                    Не удалось отправить задержку
                </Notification>
            );
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
                label="Настройка задержки"
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
            {notification}
        </form>
    );
};

export default Delay;
