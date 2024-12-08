import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import "./DeliveryInfo.css"

export const DeliveryInfo = () => {
    const [areas, setAreas] = useState([]);
    const [cities, setCities] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    useEffect(() => {
        // Получить области
        axios.post('http://localhost:5000/api/novaposhta', {
            modelName: 'Address',
            calledMethod: 'getAreas',
            methodProperties: {},
        })
            .then(response => {
                const areasData = response.data.data.map(area => ({
                    value: area.Ref,
                    label: area.Description,
                }));
                setAreas(areasData);
            })
            .catch(error => console.error('Ошибка загрузки областей:', error));
    }, []);

    useEffect(() => {
        if (selectedArea) {
            // Получить города
            axios.post('http://localhost:5000/api/novaposhta', {
                modelName: 'Address',
                calledMethod: 'getCities',
                methodProperties: { AreaRef: selectedArea.value },
            })
                .then(response => {
                    const citiesData = response.data.data.map(city => ({
                        value: city.Ref,
                        label: city.Description,
                    }));
                    setCities(citiesData);
                    setWarehouses([]); // Очистить отделения при смене города
                })
                .catch(error => console.error('Ошибка загрузки городов:', error));
        }
    }, [selectedArea]);

    useEffect(() => {
        if (selectedCity) {
            // Получить отделения
            axios.post('http://localhost:5000/api/novaposhta', {
                modelName: 'Address',
                calledMethod: 'getWarehouses',
                methodProperties: { CityRef: selectedCity.value },
            })
                .then(response => {
                    const warehousesData = response.data.data.map(warehouse => ({
                        value: warehouse.Ref,
                        label: warehouse.Description,
                    }));
                    setWarehouses(warehousesData);
                })
                .catch(error => console.error('Ошибка загрузки отделений:', error));
        }
    }, [selectedCity]);

    return (
        <div className='delivery-info-block'>
            <div className='delivery-info-head'>ДОСТАВКА</div>
            <div className='delivery-info-selects'>
                <Select
                    options={areas}
                    onChange={setSelectedArea}
                    placeholder="Оберіть область"
                />
                <Select
                    options={cities}
                    onChange={setSelectedCity}
                    placeholder="Оберіть місто"
                />
                <div className='delivery-info-bottom-select'>
                    <Select
                        options={warehouses}
                        onChange={setSelectedWarehouse}
                        placeholder="Оберіть відділення"
                    />
                </div>
            </div>
        </div>
    );
};
