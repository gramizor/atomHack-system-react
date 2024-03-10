import React, { useEffect } from 'react';
import { DatePicker } from '@mantine/dates';
import { AreaChart } from '@mantine/charts';
import './Chart.scss';
interface ChartProps {
    jsonData: any[]; // Принимаем jsonData из родительского компонента
}

interface DataItem {
    from: string;
    to: string;
    speed: number;
}

const Chart: React.FC<ChartProps> = ({ jsonData }) => {
    const [selectedDateRange, setSelectedDateRange] = React.useState<[Date | null, Date | null]>([null, null]);
    // Функция для фильтрации данных по датам
    const filterDataByDateRange = (data: DataItem[], dateRange: [Date | null, Date | null]) => {
        const [startDate, endDate] = dateRange;

        if (!startDate && !endDate) {
            return data;
        }

        if (startDate && !endDate) {
            // Если выбран только один день, фильтруем данные, чтобы отобразить все данные за этот день
            const selectedDate = startDate;
            return data.filter(item => {
                const fromTime = new Date(item.from);
                const toTime = new Date(item.to);
                // Проверяем, что отрезок данных перекрывает выбранный день
                return fromTime <= selectedDate && toTime >= selectedDate;
            });
        }
        const filteredStartDate = startDate ?? new Date(-8640000000000000);
        // Если endDate равно null, используем максимальную дату
        const filteredEndDate = endDate ?? new Date(8640000000000000);

        // Если выбран диапазон дат, возвращаем данные, которые полностью или частично находятся в этом диапазоне
        return data.filter(item => {
            const fromTime = new Date(item.from);
            const toTime = new Date(item.to);
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