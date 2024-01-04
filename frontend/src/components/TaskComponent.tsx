'use client';
import React, { useState } from 'react';
import { deleteTask, getTask } from '../api/TaskService';
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

export interface TaskProps {
  id: string;
  title?: string;
  date?: string;
  is_completed?: boolean;
}

export const TaskComponent: React.FC<TaskProps> = ({
  id,
  title,
  date,
  is_completed,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(
    is_completed ?? false
  );

  const taskClick = () => {
    setIsCompleted(!isCompleted);
  };

  const deleteClick = () => {
    console.log(id);
    getTask(id);
    deleteTask(id);
  };

  return (
    <Row style={boxStyle} onClick={taskClick} align={'middle'}>
      <Col span={1}>
        {isCompleted && (
          <CheckCircleOutlined
            style={{ fontSize: '20px', color: blue.primary }}
          />
        )}
        {!isCompleted && <MinusCircleOutlined style={{ fontSize: '20px' }} />}
      </Col>
      <Col span={5}>{title}</Col>
      <Col span={8}>{date}</Col>
      <Col span={2} offset={8}>
        <Button icon={<DeleteOutlined />} onClick={deleteClick} />
      </Col>
    </Row>
  );
};
