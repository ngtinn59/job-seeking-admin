import { Badge, Dropdown, List, Button } from "antd";
import { useState, useEffect } from "react";
import { AiOutlineBell } from "react-icons/ai";

interface Notification {
  id: string;
  message: string;
  read_at: string | null;
  created_at: string;
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    // Fake API call to fetch notifications
    const fetchNotifications = async () => {
      const response = await fetch("http://101.101.96.43/api/admin/notifications"); // Thay thế bằng endpoint thực
      const data: Notification[] = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read_at).length);
    };
    fetchNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))
    );
    setUnreadCount((prev) => Math.max(prev - 1, 0));
  };

  const menuItems = (
    <List
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item
          style={{
            background: item.read_at ? "white" : "#f6f6f6",
            cursor: "pointer",
          }}
          onClick={() => markAsRead(item.id)}
        >
          {item.message}
        </List.Item>
      )}
    />
  );

  return (
    <Dropdown overlay={menuItems} placement="bottomRight" trigger={["click"]}>
      <Badge count={unreadCount} offset={[10, 0]}>
        <Button
          type="text"
          icon={<AiOutlineBell style={{ fontSize: "20px" }} />}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationBell;
