import { Menu, Switch, Space } from 'antd';

const Settings = () => (
  <Menu theme="dark">
    <Menu.Item>
      <Space>
        <Switch unCheckedChildren />
        Dark Mode
      </Space>
    </Menu.Item>
  </Menu>
);

export default Settings;
