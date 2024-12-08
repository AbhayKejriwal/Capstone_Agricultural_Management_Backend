// Implement the CRUD operations for the finance service
// service functions
// - createFinance: Create a new finance record
// - readFinanceByFarmId: Retrieve all finance records for a farm
// - readFinanceById: Retrieve a finance record by ID
// - updateFinance: Update an existing finance record
// - deleteFinance: Delete an existing finance record
// - getTotalCredit: Calculate the total credit amount for a farm
// - getTotalIncome: Calculate the total income amount for a farm
// - getTotalExpense: Calculate the total expense amount for a farm

import { Finances } from '../models/Finances.js';

export const createFinance = async (financeData) => {
    return await Finances.create(financeData);
}

export const readFinanceByFarmId = async (farmId) => {
    return await Finances.find({ farmId: farmId });
}

export const readFinanceById = async (financeId) => {
    return await Finances.findById(financeId);
}

export const updateFinance = async (financeId, financeData) => {
    return await Finances.findByIdAndUpdate(financeId, financeData, { new: true });
}

export const deleteFinance = async (financeId) => {
    return await Finances.findByIdAndDelete(financeId);
}

export const getTotalCredit = async (farmId) => {
    const finances = await Finances.find({ farmId: farmId, transactionType: 'credit' });
    return finances.reduce((total, finance) => total + finance.amount, 0);
}

export const getTotalIncome = async (farmId) => {
    const finances = await Finances.find({ farmId: farmId, transactionType: 'income' });
    return finances.reduce((total, finance) => total + finance.amount, 0);
}

export const getTotalExpense = async (farmId) => {
    const finances = await Finances.find({ farmId: farmId, transactionType: 'expense' });
    return finances.reduce((total, finance) => total + finance.amount, 0);
}