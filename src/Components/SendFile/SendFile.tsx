import { useState } from 'react'
import { Button, FileInput, rem } from '@mantine/core';
import './SendFile.scss'
import { IconFileCode } from '@tabler/icons-react';
type Props = {}

function SendFile({ }: Props) {
    const [value, setValue] = useState<File | null>(null);

    const icon = <IconFileCode style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    return (
        <div>
            <FileInput
                label="Загрузка файла"
                placeholder="Выберите json file"
                value={value}
                onChange={setValue}
                accept="file/json"
                clearable
                leftSection={icon}
                leftSectionPointerEvents='none'
            />
            <div style={{ marginTop: '5px' }}>
                <Button fullWidth>
                    Отправить файл
                </Button>
            </div>
        </div>
    )
}

export default SendFile