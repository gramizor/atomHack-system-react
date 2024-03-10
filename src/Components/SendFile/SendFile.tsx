import { useState } from 'react';
import { Button, FileInput, rem } from '@mantine/core';
import { IconFileCode, IconX, IconCheck } from '@tabler/icons-react';
import { Config } from "../../config/types";
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import './SendFile.scss';

function SendFile({ INITAPI_SERVICE_HOST }: Config) {
    const [value, setValue] = useState<File | null>(null);
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
    const icon = <IconFileCode style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const handleClick = async () => {
        if (!value) {
            console.error('No file selected');
            notifications.show({
                title: 'Ошибка!',
                message: 'Файл не выбран',
                icon: xIcon,
                color: 'red',
                withCloseButton: true,
                autoClose: 5000,
            })
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
            notifications.show({
                title: 'Успешно!',
                message: 'Файл отправлен',
                icon: checkIcon,
                color: 'teal',
                withCloseButton: true,
                autoClose: 5000,
            })
        } catch (error) {
            console.error('Error sending request:', error);
            notifications.show({
                title: 'Ошибка!',
                message: 'Не удалось отправить файл',
                icon: xIcon,
                color: 'red',
                withCloseButton: true,
                autoClose: 5000,
            })
        }
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
        </div>
    );
}

export default SendFile;
