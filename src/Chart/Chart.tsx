import { DatePicker } from '@mantine/dates'
import { useState } from 'react'


const Chart = () => {
    const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);

    return (
        <>
            <DatePicker
                type="range"
                allowSingleDateInRange
                value={selectedDateRange}
                onChange={setSelectedDateRange}
            />
        </>
    )
}

export default Chart