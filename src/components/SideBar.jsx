import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, UserAddOutlined } from '@ant-design/icons';

const Sidebar = () => {
  return (
    <Menu mode="inline" theme="light" style={{ height: '100%', borderRight: 0 }}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Home Page</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserAddOutlined />}>
        <Link to="/register">Register Page</Link>
          </Menu.Item>

      <Menu.Item key="2" icon={<AppstoreOutlined />}>
        <Link to="/category">Category Page</Link>
      </Menu.Item>
      
          <Menu.Item key="4" icon={<AppstoreOutlined />}>
        <Link to="/products">Products Page</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
