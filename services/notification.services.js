// Implements the CRUD operations for the notification collection
// service functions
// - createNotification: Create a new notification
// - readNotificationsByUserId: Retrieve all notifications for a user
// - updateNotification: Update an existing notification
// - deleteNotification: Delete an existing notification

import { Notifications } from '../models/Notifications.js';

export const createNotification = async (notificationData) => {
    return await Notifications.create(notificationData);
}

export const readNotificationsByUserId = async (userId) => {
    return await Notifications.find({ userId: userId });
}

export const updateNotification = async (notificationId, notificationData) => {
    return await Notifications.findByIdAndUpdate(notificationId, notificationData, { new: true });
}

export const deleteNotification = async (notificationId) => {
    return await Notifications.findByIdAndDelete(notificationId);
}

export const deleteAllNotificationsByUserId = async (userId) => {
    return await Notifications.deleteMany({ userId: userId });
}