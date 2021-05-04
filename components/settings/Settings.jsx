import { Menu, Switch, Space } from 'antd';

export default function Settings() {
  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item>
        <Space>
          <Switch unCheckedChildren />
          Dark Mode
        </Space>
      </Menu.Item>
    </Menu>
  );
}
