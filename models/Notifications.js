// Defines the schema for the Notifications model
// Fields:
// - NotificationId: Unique identifier for each notification.
// - UserId: Reference to the user who receives the notification (foreign key to the User model).
// - Message: String containing the notification message.
// - Type: String indicating the type of notification (e.g., alert, reminder).
// - Status: String indicating the current status of the notification.
// - TimeStamp: Date indicating the time the notification was created.
// Export the Notifications model to use in services and controllers.

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['alert', 'reminder'],
        required: true
    },
    status: {
        type: String,
        enum: ['read', 'unread'],
        default: 'unread'
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

export const Notifications = mongoose.model('Notifications', notificationSchema);