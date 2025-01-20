import React, { useState, useEffect } from "react";
import "./SizeChartModal.css";
import { Modal } from "../../../../common/Modal";

export const SizeChartModal = ({ isModalOpen, setIsModalOpen, sizeChartId }) => {
    const [sizeChart, setSizeChart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSizeChart = async (id) => {
            try {
                const response = await fetch(`http://16.171.32.44/api/sizechart/size-chart/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch size chart: ${response.statusText}`);
                }
                const data = await response.json();
                
                return data;
            } catch (error) {
                console.error("Error fetching size chart:", error);
                throw error;
            }
        };
        

        if (isModalOpen && sizeChartId) {
            setLoading(true);
            fetchSizeChart(sizeChartId)
                .then((data) => setSizeChart(data) && console.log(data))
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [isModalOpen, sizeChartId]);

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2>Таблиця розмірів</h2>
            {loading ? (
                <p>Завантаження...</p>
            ) : error ? (
                <p>Помилка: {error}</p>
            ) : sizeChart ? (
                <table className="size-chart">
                    <thead>
                        <tr>
                            {sizeChart.columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sizeChart.rows.map((row, rowIndex) => (
                            <tr key={row._id || rowIndex}>
                                {sizeChart.columns.map((column, colIndex) => (
                                    <td key={colIndex}>{row.data[column] || "-"}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Таблиця розмірів недоступна.</p>
            )}
        </Modal>
    );
    
};
