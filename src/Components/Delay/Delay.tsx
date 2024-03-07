import { Button, NumberInput } from "@mantine/core"
import './Delay.scss'

type Props = {}

function Delay({ }: Props) {
    return (
        <div>
            <NumberInput
                label="Введите задержку"
                placeholder="Секунды"
                suffix=" сек"
                defaultValue={10}
            />
            <div style={{ marginTop: '5px' }}>
                <Button fullWidth>
                    Установить задержку
                </Button>
            </div>
        </div>
    )
}

export default Delay