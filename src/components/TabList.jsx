import React from 'react';
import List from 'antd/lib/list';
export default function TabList({ itemList }) {
  return (
    <div>
      <List
        dataSource={itemList}
        renderItem={(item) => (
          <List.Item style={{ color: 'white' }}>{item}</List.Item>
        )}
      />
    </div>
  );
}
