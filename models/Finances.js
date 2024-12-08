//Define the schema for the Finances model
// Fields:
// - FinanceId: Unique identifier for each finance record. auto assigned by MongoDB.
// - FarmId: Reference to the farm where the finance record is associated (foreign key to the Farm model).
// - Farm: Name of the farm where the finance record is associated.
// - TransactionType: String indicating the type of transaction (e.g., income, expense, credit).
// - Date: Date of the transaction.
// - Amount: Amount of the transaction.
// - Details: Additional details about the transaction.
// Export the Finances model to use in services and controllers

import mongoose from 'mongoose';

const financeSchema = new mongoose.Schema({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },
    farm: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        enum: ['income', 'expense', 'credit'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    details: {
        type: String
    }
});

export const Finances = mongoose.model('Finances', financeSchema);