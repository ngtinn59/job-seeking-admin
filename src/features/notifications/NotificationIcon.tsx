import {
  Badge,
  Button,
  Divider,
  notification,
  Popover,
  Typography,
} from "antd";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { RiDeleteBinLine, RiNotificationLine } from "react-icons/ri";
import {
  Message,
  useDeleteNotification,
  useGetNotifications,
  useReadNotification,
} from "./actions";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useAppSelector } from "../../hooks";

export type MessageEvent = {
  id: number;
  type: string;
  notifiable_type: string;
  notifiable_id: string;
  data: {
    message: string;
  };
  read_at: null;
  created_at: string;
  updated_at: string;
};

export const NotifcationIcon = () => {
  const { id } = useAppSelector((state) => state.user.account);
  const { data: noti } = useGetNotifications(id);

  const pusherRef = useRef(
    new Pusher("e18109c4b9ff5b7d7c55", { cluster: "ap1" }),
  );

  const [notifications, setNotifications] = useState<Message[]>([]);

  useEffect(() => {
    if (!noti) return setNotifications([]);
    if (noti) {
      setNotifications(noti);
    }
  }, [noti]);

  useEffect(() => {
    const notification = pusherRef.current.subscribe(`user.${id}`);
    notification.bind("JobCreated", (newNoti: MessageEvent) => {
      setNotifications((prev) => {
        const ew: Message = {
          id: newNoti.notifiable_id,
          message: newNoti.data.message,
          read_at: null,
          created_at: new Date(newNoti.created_at).toLocaleDateString(),
        };

        return prev.length ? [...prev, ew] : [ew];
      });
    });

    return () => {
      notification.unbind_all();
      notification.unsubscribe();
    };
  }, [id]);

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      arrow={false}
      className="relative mr-2"
      content={<NotificationList items={notifications} />}
    >
      <Badge
        className="absolute right-0 top-1"
        size="small"
        count={
          Array.isArray(notifications)
            ? notifications?.filter((item) => !item?.read_at)?.length
            : 0
        }
      />
      <Button
        type="text"
        variant="text"
        icon={<RiNotificationLine size={20} />}
      />
    </Popover>
  );
};

const NotificationList = ({ items }: { items: Message[] }) => {
  console.log(items);

  return (
    <>
      <Typography.Title level={5}>Thông báo</Typography.Title>
      <ul className="h-80 w-80 overflow-auto p-4">
        {items.length ? (
          items.map((item, i, self) => (
            <NotificationItem
              key={item.id}
              lastItem={i + 1 === self.length}
              {...item}
            />
          ))
        ) : (
          <li>Không có thông báo nào</li>
        )}
      </ul>
    </>
  );
};

type NotificationItemProps = Message & { lastItem: boolean };

const NotificationItem = ({
  id,
  read_at,
  message,
  created_at,
  lastItem,
}: NotificationItemProps) => {
  const { mutate: userRead, isPending: userPending } = useReadNotification();

  const { mutate: userDelete, isPending: userDeletePending } =
    useDeleteNotification();

  const onRead = () => {
    userRead(id, {
      onSuccess: () => {
        notification.success({
          message: "Đánh dấu đã đọc thành công",
        });
      },
    });
  };

  const onDelete = () => {
    userDelete(id, {
      onSuccess: () => {
        notification.success({
          message: "Xóa thông báo thành công",
        });
      },
    });
  };

  return (
    <li className="mb-3 flex flex-col">
      <div className="flex gap-2">
        <Typography.Paragraph className={`${!read_at && "font-bold"}`}>
          {message}
        </Typography.Paragraph>

        <div className="flex gap-1">
          <Button
            loading={userPending}
            onClick={onRead}
            disabled={!!read_at}
            variant="solid"
            color="primary"
            size="small"
            icon={<MdOutlineMarkEmailRead size={10} />}
          />
          <Button
            loading={userDeletePending}
            onClick={onDelete}
            variant="solid"
            color="danger"
            size="small"
            icon={<RiDeleteBinLine size={10} />}
          />
        </div>
      </div>
      <Typography.Text className="text-xs">
        {new Date(created_at).toLocaleDateString()}
      </Typography.Text>
      {!lastItem && <Divider />}
    </li>
  );
};
