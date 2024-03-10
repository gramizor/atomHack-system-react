import React, { useEffect, useState } from 'react';
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
                // const segmentDuration = toTime.getTime() - fromTime.getTime();
                const segmentSpeed = currentItem.speed;

                // Добавляем первую точку каждого отрезка
                transformedData.push({ date: fromTime.toLocaleString(), speed: segmentSpeed });

                // Добавляем вторую точку, если скорость не равна нулю и следующая скорость не равна нулю
                if (segmentSpeed !== 0 && (i < jsonData.length - 1) && jsonData[i + 1].speed !== 0) {
                    const secondActiveTime = new Date(toTime.getTime()).toLocaleString();
                    transformedData.push({ date: secondActiveTime, speed: segmentSpeed });
                }

                // Добавляем точку, если скорость обнуляется
                if (i < jsonData.length - 1) {
                    const nextItem = jsonData[i + 1];
                    const gapStart = new Date(toTime.getTime() + 1).toLocaleString();
                    const gapEnd = new Date(nextItem.from).toLocaleString();
                    transformedData.push({ date: gapStart, speed: 0 });
                    transformedData.push({ date: gapEnd, speed: 0 });
                } else {
                    // Если это последний элемент в JSON, добавляем последнюю точку "to"
                    transformedData.push({ date: toTime.toLocaleString(), speed: segmentSpeed });
                }
            }
        }

        return transformedData;
    };
    useEffect(() => console.log(selectedDateRange), [selectedDateRange]);

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
                    data={transformData()}
                    dataKey="date"
                    series={[{ name: 'speed', color: 'indigo.6' }]}
                    curveType="linear"
                    tickLine="xy"
                    gridAxis="xy"
                />
            </div>
        </div>
    );
};

export default Chart;
