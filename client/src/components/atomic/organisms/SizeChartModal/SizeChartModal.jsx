import React from "react";

import { Modal } from "../../../../common/Modal";

export const SizeChartModal = ({ isModalOpen, setIsModalOpen }) => {
  if (!isModalOpen) return null;

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h2>Таблиця розмірів</h2>
      <table className="size-chart">
        <thead>
          <tr>
            <th>WIXI</th>
            <th>EU</th>
            <th>груди</th>
            <th>талія</th>
            <th>бедра</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>XS</td>
            <td>34/36</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>S</td>
            <td>38</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>M</td>
            <td>40/42</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>L</td>
            <td>44/46</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>XL</td>
            <td>48/50</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2XL</td>
            <td>52/54</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3XL</td>
            <td>56/58</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};
