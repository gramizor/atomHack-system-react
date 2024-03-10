import { useState } from 'react';
import { Button, FileInput, rem } from '@mantine/core';
import { IconFileCode, IconX, IconCheck } from '@tabler/icons-react';
import { Config } from "../../config/types";
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import './SendFile.scss';

type Props = {
    setJsonData: (JSON: object[]) => void;
}

function SendFile({ INITAPI_SERVICE_HOST, SENDER_SERVICE_HOST, setJsonData }: Config & Props): React.ReactElement {
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
            await axios.post(`${SENDER_SERVICE_HOST}/periods`);
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

    const handleFileChange = (file: File | null) => {
        setValue(file);
        if (file) {
            parseJSONFile(file);
        }
    };

    const parseJSONFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsedData = JSON.parse(reader.result as string);
                setJsonData(parsedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                notifications.show({
                    title: 'Ошибка!',
                    message: 'Ошибка при парсинге JSON файла',
                    icon: xIcon,
                    color: 'red',
                    withCloseButton: true,
                    autoClose: 5000,
                });
            }
        };
        reader.readAsText(file);
    };

    return (
        <div
            id="sendFileForm"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            style={{
                border:
                    '2px dashed #ccc',
                padding: '35px 50px',
                borderRadius: '5px'
            }}
        >
            <FileInput
                label="Загрузка файла"
                placeholder="Выберите или перетащите json file"
                value={value}
                onChange={handleFileChange}
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
            {/* <Chart jsonData={jsonData} /> */}
        </div>
    );
}

export default SendFile;
