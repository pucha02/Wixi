import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { fetchDataUser } from "../../../../../utils/userDataOperations";

export const DeliveryInfo = ({ orderDetails, setOrderDetails }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  // const [orderDetails, setOrderDetails] = useState({
  //     number_section_NP: '',
  //     firstname: '',
  //     lastname: '',
  //     coment: '',
  //     email: '',
  //     number_phone: '',
  //     area: '',
  //     city: '',
  //     warehouse: '',
  // });

  useEffect(() => {
    fetchDataUser(setUser, setOrderDetails, setIsLoading);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:5001/api/novaposhta", {
        modelName: "Address",
        calledMethod: "getAreas",
        methodProperties: {},
      })
      .then((response) => {
        const areasData = response.data.data.map((area) => ({
          value: area.Ref,
          label: area.Description,
        }));
        setAreas(areasData);
      })
      .catch((error) => console.error("Ошибка загрузки областей:", error));
  }, []);

  useEffect(() => {
    if (selectedArea) {
      axios
        .post("http://localhost:5001/api/novaposhta", {
          modelName: "Address",
          calledMethod: "getCities",
          methodProperties: { AreaRef: selectedArea.value },
        })
        .then((response) => {
          const citiesData = response.data.data.map((city) => ({
            value: city.Ref,
            label: city.Description,
          }));
          setCities(citiesData);
          setWarehouses([]);
        })
        .catch((error) => console.error("Ошибка загрузки городов:", error));
    }
  }, [selectedArea]);

  useEffect(() => {
    if (selectedCity) {
      axios
        .post("http://localhost:5001/api/novaposhta", {
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: { CityRef: selectedCity.value },
        })
        .then((response) => {
          const warehousesData = response.data.data.map((warehouse) => ({
            value: warehouse.Ref,
            label: warehouse.Description,
          }));
          setWarehouses(warehousesData);
        })
        .catch((error) => console.error("Ошибка загрузки отделений:", error));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (!isLoading && user) {
      const { area, city, warehouse } = orderDetails;

      // Устанавливаем область
      const initialArea = areas.find((a) => a.label === area);
      if (initialArea) {
        setSelectedArea(initialArea);

        // Загружаем города для выбранной области
        axios
          .post("http://localhost:5001/api/novaposhta", {
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: { AreaRef: initialArea.value },
          })
          .then((response) => {
            const citiesData = response.data.data.map((city) => ({
              value: city.Ref,
              label: city.Description,
            }));
            setCities(citiesData);

            // Устанавливаем город
            const initialCity = citiesData.find((c) => c.label === city);
            if (initialCity) {
              setSelectedCity(initialCity);

              // Загружаем отделения для выбранного города
              axios
                .post("http://localhost:5001/api/novaposhta", {
                  modelName: "Address",
                  calledMethod: "getWarehouses",
                  methodProperties: { CityRef: initialCity.value },
                })
                .then((response) => {
                  const warehousesData = response.data.data.map((wh) => ({
                    value: wh.Ref,
                    label: wh.Description,
                  }));
                  setWarehouses(warehousesData);

                  // Устанавливаем отделение
                  const initialWarehouse = warehousesData.find(
                    (w) => w.label === warehouse
                  );
                  if (initialWarehouse) {
                    setSelectedWarehouse(initialWarehouse);
                  }
                });
            }
          });
      }
    }
  }, [areas, user, isLoading, orderDetails]);

  return (
    <div className="delivery-info-block">
      <div className="delivery-info-head">ДОСТАВКА</div>
      <div className="delivery-info-selects">
        <Select
          options={areas}
          value={selectedArea}
          onChange={(area) => {
            setSelectedArea(area);
            setOrderDetails((prev) => ({
              ...prev,
              area: area ? area.label : "",
              city: "",
              warehouse: "",
            }));
            setSelectedCity(null);
            setSelectedWarehouse(null);
          }}
          placeholder="Оберіть область"
        />
        <Select
          options={cities}
          value={selectedCity}
          onChange={(city) => {
            setSelectedCity(city);
            setOrderDetails((prev) => ({
              ...prev,
              city: city ? city.label : "",
              warehouse: "",
            }));
            setSelectedWarehouse(null);
          }}
          placeholder="Оберіть місто"
        />

        <div className="delivery-info-bottom-select">
          <Select
            options={warehouses}
            value={selectedWarehouse}
            onChange={(warehouse) => {
              setSelectedWarehouse(warehouse);
              setOrderDetails((prev) => ({
                ...prev,
                warehouse: warehouse ? warehouse.label : "",
              }));
            }}
            placeholder="Оберіть відділення"
          />
        </div>
      </div>
    </div>
  );
};
