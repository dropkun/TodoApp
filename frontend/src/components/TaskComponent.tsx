'use client';
import React, { useState } from 'react';
import { Task, taskAPI } from '../api/Task';
import { Button, Col, Row } from 'antd';
import { blue } from '@ant-design/colors';
import {
  DeleteOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 40,
  borderRadius: 6,
  border: '1px solid #40a9ff',
  margin: '2px',
};

export const TaskComponent: React.FC<Task> = ({
  id,
  title,
  date,
  isCompleted,
}) => {
  const [isCompletedOnState, setIsCompleted] = useState<boolean>(
    isCompleted ?? false
  );

  const taskClick = () => {
    setIsCompleted(!isCompletedOnState);
  };

  const deleteClick = () => {
    console.log(id);
    taskAPI.deleteTask(id);
  };

  return (
    <Row style={boxStyle} onClick={taskClick} align={'middle'}>
      <Col span={1}>
        {isCompletedOnState && (
          <CheckCircleOutlined
            style={{ fontSize: '20px', color: blue.primary }}
          />
        )}
        {!isCompletedOnState && <MinusCircleOutlined style={{ fontSize: '20px' }} />}
      </Col>
      <Col span={5}>{title}</Col>
      <Col span={8}>{date}</Col>
      <Col span={2} offset={8}>
        <Button icon={<DeleteOutlined />} onClick={deleteClick} />
      </Col>
    </Row>
  );
};
