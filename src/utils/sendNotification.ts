import { ref, push, set } from 'firebase/database';
import { database } from '../firebase';
import { AppNotification } from '../types';

export const sendNotification = async (userId: string, message: string) => {
  const notificationsRef = ref(database, `notifications/${userId}`);
  const newNotifRef = push(notificationsRef);
  const notification: AppNotification = {
    id: newNotifRef.key as string,
    message,
    read: false,
    timestamp: Date.now(),
    userId,
  };
  await set(newNotifRef, notification);
  return notification;
};
