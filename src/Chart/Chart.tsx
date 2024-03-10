import React, { useEffect } from 'react';
import { DatePicker } from '@mantine/dates';
import { AreaChart } from '@mantine/charts';
import './Chart.scss';

interface ChartProps {
    jsonData: any[]; // Принимаем jsonData из родительского компонента
}

const Chart: React.FC<ChartProps> = ({ jsonData }) => {
    const [selectedDateRange, setSelectedDateRange] = React.useState<[Date | null, Date | null]>([null, null]);
    const [transformedData, setTransformedData] = React.useState<any[]>([]);

    useEffect(() => {
        transformData();
    }, [selectedDateRange]);

    const transformData = () => {
        if (selectedDateRange[0] && selectedDateRange[1]) {
            const filteredData = jsonData.filter(item => {
                const fromDate = selectedDateRange[0] as Date;
                const toDate = selectedDateRange[1] as Date;
                const itemDate = new Date(item.from);

                return itemDate >= fromDate && itemDate <= toDate;
            });

            const transformedData = filteredData.map(item => {
                const fromTime = new Date(item.from).toLocaleString('en-GB').replace(',', '');
                return { date: fromTime, speed: item.speed };
            });

            setTransformedData(transformedData);
        } else {
            // Если диапазон дат не выбран, просто используем все данные
            const allData = jsonData.map(item => {
                const fromTime = new Date(item.from).toLocaleString('en-GB').replace(',', '');
                return { date: fromTime, speed: item.speed };
            });

            setTransformedData(allData);
        }
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
                    data={transformedData}
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
