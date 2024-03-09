import { useState } from 'react';
import { Button, FileInput, Notification, rem } from '@mantine/core';
import { IconFileCode, IconX, IconCheck } from '@tabler/icons-react';
import { Config } from "../../config/types";
import axios from 'axios';

import './SendFile.scss';

function SendFile({ INITAPI_SERVICE_HOST, SENDER_SERVICE_HOST }: Config) {
    const [value, setValue] = useState<File | null>(null);
    const [notification, setNotification] = useState<React.ReactNode | null>(null);
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
    const icon = <IconFileCode style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const handleClick = async () => {
        if (!value) {
            console.error('No file selected');
            showNotification(
                <Notification
                    icon={xIcon}
                    color="red"
                    mt="md"
                    title="Ошибка"
                    closeButtonProps={{ 'aria-label': 'Hide notification' }}
                    onClose={() => setNotification(null)}
                >
                    Файл не выбран
                </Notification>
            );
            return;
        }

        const formData = new FormData();
        formData.append('file', value);

        try {
            await axios.post(`${INITAPI_SERVICE_HOST}/api/init-periods`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await axios.post(`${SENDER_SERVICE_HOST}/periods`);
            showNotification(
                <Notification
                    icon={checkIcon}
                    color="teal"
                    title="Успешно!"
                    mt="md"
                    closeButtonProps={{ 'aria-label': 'Hide notification' }}
                    onClose={() => setNotification(null)}
                >
                    Файл отправлен
                </Notification>
            );
        } catch (error) {
            console.error('Error sending request:', error);
            showNotification(
                <Notification
                    icon={xIcon}
                    color="red"
                    mt="md"
                    title="Ошибка"
                    closeButtonProps={{ 'aria-label': 'Hide notification' }}
                    onClose={() => setNotification(null)}
                >
                    Не удалось отправить файл
                </Notification>
            );
        }
    };

    const showNotification = (notification: React.ReactNode) => {
        setNotification(notification);
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setValue(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div
            id="sendFileForm"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            style={{ border: '2px dashed #ccc', padding: '20px', borderRadius: '5px' }}
        >
            <FileInput
                label="Загрузка файла"
                placeholder="Выберите или перетащите json file"
                value={value}
                onChange={setValue}
                accept=".json"
                clearable
                leftSection={icon}
                leftSectionPointerEvents='none'
            />
            <div style={{ margin: '5px 0' }}>
                <Button fullWidth onClick={handleClick}>
                    Отправить файл
                </Button>
            </div>
            {notification}
        </div>
    );
}

export default SendFile;
