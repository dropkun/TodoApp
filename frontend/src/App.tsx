import { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { TaskComponent } from './components/TaskComponent';
import { AddTaskButton } from './components/AddTaskButton';
import { Task, taskAPI } from './api/Task';

const { Header, Sider, Content } = Layout;

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    taskAPI.getAllTasks().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UnorderedListOutlined />,
              label: 'Tasks',
            },
            {
              key: '2',
              icon: <CalendarOutlined />,
              label: 'Schedule',
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: 'User',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 640,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <AddTaskButton />
          <>
            {tasks.map((task) => (
              <TaskComponent
                key={task.id}
                id={task.id}
                title={task.title}
                date={task.date}
                isCompleted={task.isCompleted}
              />
            ))}
          </>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
