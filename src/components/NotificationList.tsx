import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AppNotification } from '../types';

interface NotificationListProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
}

export default function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">No notifications</Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 400, overflow: 'auto' }}>
      {notifications.map((notif) => (
        <ListItem
          key={notif.id}
          alignItems="flex-start"
          sx={{ bgcolor: notif.read ? 'transparent' : 'action.selected' }}
          secondaryAction={
            !notif.read && (
              <IconButton edge="end" aria-label="mark as read" size="small" onClick={() => onMarkAsRead(notif.id)}>
                <CheckCircleOutlineIcon fontSize="small" />
              </IconButton>
            )
          }
        >
          <ListItemText
            primary={
              <Typography variant="body2" fontWeight={notif.read ? 'normal' : 'bold'}>
                {notif.message}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="text.secondary">
                {new Date(notif.timestamp).toLocaleString()}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
