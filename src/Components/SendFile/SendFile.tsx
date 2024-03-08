import { useState } from 'react'
import { Button, FileInput, rem } from '@mantine/core';
import { IconFileCode } from '@tabler/icons-react';
import { Config } from "../../config/types";
import axios from 'axios';

import './SendFile.scss'

function SendFile({ INITAPI_SERVICE_HOST} : Config) {
    const [value, setValue] = useState<File | null>(null);

    const icon = <IconFileCode style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const handleClick = async () => {
        if (!value) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', value);

        try {
            await axios.post(`https://${INITAPI_SERVICE_HOST}/api/init-periods`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log('API response:', response.data);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <form id="sendFileForm" onSubmit={handleClick}>
            <FileInput
                label="Загрузка файла"
                placeholder="Выберите json file"
                value={value}
                onChange={setValue}
                accept=".json"
                clearable
                leftSection={icon}
                leftSectionPointerEvents='none'
            />
            <div style={{ marginTop: '5px' }}>
                <Button fullWidth onClick={handleClick}>
                    Отправить файл
                </Button>
            </div>
        </form>
    )
}

export default SendFile