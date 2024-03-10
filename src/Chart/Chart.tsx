import React from 'react';
// import { DatePicker } from '@mantine/dates';
import { AreaChart } from '@mantine/charts';
import './Chart.scss';
interface ChartProps {
    jsonData: any[];
}

interface DataItem {
    from: string;
    to: string;
    speed: number;
}

const Chart: React.FC<ChartProps> = ({ jsonData }) => {
    const [selectedDateRange] = React.useState<[Date | null, Date | null]>([null, null]);

    const filterDataByDateRange = (data: DataItem[], dateRange: [Date | null, Date | null]) => {
        const [startDate, endDate] = dateRange;

        if (!startDate && !endDate) {
            return data;
        }

        if (startDate && !endDate) {
            const selectedDate = startDate.getTime(); // Получаем миллисекунды
            return data.filter(item => {
                const fromTime = new Date(item.from).getTime(); // Получаем миллисекунды
                const toTime = new Date(item.to).getTime(); // Получаем миллисекунды
                return fromTime <= selectedDate && toTime >= selectedDate;
            });
        }

        if (startDate == endDate) {

        }

        const filteredStartDate = startDate?.getTime() ?? Number.MIN_SAFE_INTEGER; // Получаем миллисекунды
        const filteredEndDate = endDate?.getTime() ?? Number.MAX_SAFE_INTEGER; // Получаем миллисекунды

        return data.filter(item => {
            const fromTime = new Date(item.from).getTime(); // Получаем миллисекунды
            const toTime = new Date(item.to).getTime(); // Получаем миллисекунды
            return fromTime >= filteredStartDate && toTime <= filteredEndDate;
        });
    };


    const transformData = (): { date: string; speed: number }[] => {
        const transformedData: { date: string; speed: number }[] = [];
        const filteredData = filterDataByDateRange(jsonData, selectedDateRange);

        for (let i = 0; i < filteredData.length; i++) {
            const currentItem = filteredData[i];
            if (currentItem) {
                const fromTime = new Date(currentItem.from);
                const toTime = new Date(currentItem.to);
                const segmentSpeed = currentItem.speed;
                transformedData.push({ date: fromTime.toLocaleString(), speed: segmentSpeed });

                if (segmentSpeed !== 0 && (i < jsonData.length - 1) && jsonData[i + 1].speed !== 0) {
                    const secondActiveTime = new Date(toTime.getTime()).toLocaleString();
                    transformedData.push({ date: secondActiveTime, speed: segmentSpeed });
                }

                if (i < jsonData.length - 1) {
                    const nextItem = jsonData[i + 1];
                    const gapStart = toTime.toLocaleString(); // Начало промежутка - конечная дата текущего элемента
                    const gapEnd = new Date(nextItem.from).toLocaleString(); // Конец промежутка - начальная дата следующего элемента                    
                    transformedData.push({ date: gapStart, speed: 0 });
                    transformedData.push({ date: gapEnd, speed: 0 });
                } else {
                    transformedData.push({ date: toTime.toLocaleString(), speed: segmentSpeed });
                }
            }
        }
        // console.log(transformedData);
        return transformedData;
    };
    // useEffect(() => console.log(selectedDateRange), [selectedDateRange]);
    return (
        <div className='chart-container'>
            {/* <div className='date-picker'>
                <DatePicker
                    type="range"
                    allowSingleDateInRange
                    value={selectedDateRange}
                    onChange={setSelectedDateRange}
                />
            </div> */}
            <div className='chart'>
                <AreaChart
                    h={300}
                    data={transformData()} // Передаем преобразованные данные
                    dataKey="date" // Теперь используем "date" в качестве оси времени
                    series={[
                        { name: 'speed', color: 'indigo.6' },
                    ]}
                    curveType="linear"
                    tickLine="xy"
                    gridAxis="xy"
                />
            </div>
        </div>
    );
}
export default Chart;