// Implements functions to handle HTTP requests for notification data. Calls the service layer for business logic.
// Controller functions:
// - postNotification(req, res)
// - getNotificationsByUserId(req, res)
// - markNotificationRead(req, res)
// - deleteNotification(req, res)
// - deleteAllNotificationsByUserId(req, res)

// Required modules
import { createNotification, readNotificationsByUserId, updateNotification, deleteNotification, deleteAllNotificationsByUserId } from '../services/notification.services.js';

// Create a new notification
export async function postNotification(req, res) {
    try {
        const { userId, message, type } = req.body;

        if (!userId || !message || !type) {
            console.log('Please provide all required fields: userId, message and type');
            console.log(req.body);
            return res.status(400).json({ message: 'Please provide all required fields: userId, message and type' });
        }

        const notification = {
            userId,
            message,
            type
        };

        const newNotification = await createNotification(notification);

        res.status(201).json({
            message: 'Notification created successfully',
            notification: newNotification
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get all notifications for a user
export async function getNotificationsByUserId(req, res) {
    try {
        const userId = req.user.id;
        const notifications = await readNotificationsByUserId(userId);
        if (!notifications) {
            return res.status(404).json({ message: 'No notifications found for this user' });
        }

        res.status(200).json(notifications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get all unread notifications for a user
export async function getUnreadNotificationsByUserId(req, res) {
    try {
        const userId = req.user.id;
        const notifications = await readNotificationsByUserId(userId);

        if (!notifications) {
            return res.status(404).json({ message: 'No notifications found for this user' });
        }

        const unreadNotifications = notifications.filter(notification => notification.status === 'unread');

        res.status(200).json(unreadNotifications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Mark a notification as read
export async function markNotificationRead(req, res) {
    try {
        const notificationId = req.params.id;
        const updatedNotification = await updateNotification(notificationId, { status: 'read' });

        if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({
            message: 'Notification marked as read',
            notification: updatedNotification
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Mark all notifications as read
export async function markAllNotificationRead(req, res) {
    try {
        const userId = req.user.id;
        const notifications = await readNotificationsByUserId(userId);

        if (!notifications) {
            return res.status(404).json({ message: 'No notifications found for this user' });
        }

        const updatedNotifications = notifications.map(notification => {
            return updateNotification(notification._id, { status: 'read' });
        });

        res.status(200).json({
            message: 'All notifications marked as read',
            notifications: updatedNotifications
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Delete a notification
export async function removeNotification(req, res) {
    try {
        const notificationId = req.params.id;
        const deletedNotification = await deleteNotification(notificationId);

        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({
            message: 'Notification deleted successfully',
            notification: deletedNotification
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Delete all notifications for a user
export async function removeAllNotificationsByUserId(req, res) {
    try {
        const userId = req.user.id;
        const deletedNotifications = await deleteAllNotificationsByUserId(userId);

        if (!deletedNotifications) {
            return res.status(404).json({ message: 'No notifications found for this user' });
        }

        res.status(200).json({
            message: 'All notifications deleted successfully',
            notifications: deletedNotifications
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}