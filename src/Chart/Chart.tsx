import React from 'react';
import { DatePicker } from '@mantine/dates';
import { AreaChart } from '@mantine/charts';
import './Chart.scss';

interface ChartProps {
    jsonData: any[]; // Принимаем jsonData из родительского компонента
}

const Chart: React.FC<ChartProps> = ({ jsonData }) => {
    const [selectedDateRange, setSelectedDateRange] = React.useState<[Date | null, Date | null]>([null, null]);

    const transformData = () => {
        const transformedData = [];
        for (let i = 0; i < jsonData.length; i++) {
            const currentItem = jsonData[i];
            if (currentItem) {
                const fromTime = new Date(currentItem.from);
                const toTime = new Date(currentItem.to);
                const segmentDuration = toTime.getTime() - fromTime.getTime();
                const segmentSpeed = currentItem.speed;
                const numPoints = Math.ceil(segmentDuration / (1000 * 60 * 15)); // Предполагаем, что каждая точка на графике представляет 15 минут
                const segmentData = [];
                for (let j = 0; j < numPoints; j++) {
                    const time = new Date(fromTime.getTime() + (j * 1000 * 60 * 15));
                    const formattedTime = time.toLocaleString(); // Преобразование времени в человеко-читаемый формат
                    segmentData.push({ date: formattedTime, speed: segmentSpeed });
                }
                transformedData.push(...segmentData);
                // Добавляем точку со скоростью 0 в конце каждого отрезка, кроме последнего
                if (i < jsonData.length - 1) {
                    const nextItem = jsonData[i + 1];
                    const gapStart = new Date(toTime.getTime() + 1).toLocaleString(); // Преобразование времени в человеко-читаемый формат
                    const gapEnd = new Date(nextItem.from).toLocaleString(); // Преобразование времени в человеко-читаемый формат
                    transformedData.push({ date: gapStart, speed: 0 });
                    transformedData.push({ date: gapEnd, speed: 0 });
                }
            }
        }
        return transformedData;
    };


    return (
        <div className='chart-container'>
            <div className='date-picker'>
                <DatePicker
                    type="range"
                    allowSingleDateInRange
                    value={selectedDateRange}
                    onChange={setSelectedDateRange}
                />
            </div>
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
