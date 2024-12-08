// Implements functions to handle HTTP requests for finance data. Calls the service layer for business logic.
// Controller functions:
// - postFinance(req, res)
// - getFinanceByFarmId(req, res)
// - getFinanceById(req, res)
// - putFinance(req, res)
// - removeFinance(req, res)
// - getFinancesTotal(req, res)

// Required modules
import { createFinance, readFinanceByFarmId, readFinanceById, updateFinance, deleteFinance, getTotalCredit, getTotalIncome, getTotalExpense } from '../services/finance.services.js';

// Create a new finance record
export async function postFinance(req, res) {
    try {
        const { farmId, farm, transactionType, date, amount, details } = req.body;

        if (!farmId || !farm || !transactionType || !date || !amount) {
            console.log('Please provide all required fields: farmId, transactionType, date and amount');
            console.log(req.body);
            return res.status(400).json({ message: 'Please provide all required fields: farmId, transactionType, date and amount' });
        }

        const finance = {
            farmId,
            farm,
            transactionType,
            date,
            amount,
            details
        };

        const newFinance = await createFinance(finance);

        res.status(201).json({
            message: 'Finance record created successfully',
            finance: newFinance
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get all finance records for a farm
export async function getFinanceByFarmId(req, res) {
    try {
        const farmId = req.params.id;
        const finances = await readFinanceByFarmId(farmId);
        if (!finances) {
            return res.status(404).json({ message: 'No finance records found for this farm' });
        }

        res.status(200).json(finances);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get a finance record by ID
export async function getFinanceById(req, res) {
    try {
        const financeId = req.params.id;
        const finance = await readFinanceById(financeId);
        if (!finance) {
            return res.status(404).json({ message: 'Finance record not found' });
        }

        res.status(200).json(finance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Update a finance record
export async function putFinance(req, res) {
    try {
        const financeId = req.params.id;
        const financeData = req.body;

        const updatedFinance = await updateFinance(financeId, financeData);
        if (!updatedFinance) {
            return res.status(404).json({ message: 'Finance record not found' });
        }

        res.status(200).json({
            message: 'Finance record updated successfully',
            finance: updatedFinance
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Delete a finance record
export async function removeFinance(req, res) {
    try {
        const financeId = req.params.id;
        const deletedFinance = await deleteFinance(financeId);
        if (!deletedFinance) {
            return res.status(404).json({ message: 'Finance record not found' });
        }

        res.status(200).json({
            message: 'Finance record deleted successfully',
            finance: deletedFinance
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get total credit, income, and expense amounts for a farm
export async function getTotalFinancesByFarmId(req, res) {
    try {
        const farmId = req.params.id;
        const totalCredit = await getTotalCredit(farmId);
        const totalIncome = await getTotalIncome(farmId);
        const totalExpense = await getTotalExpense(farmId);

        res.status(200).json({
            totalCredit,
            totalIncome,
            totalExpense
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}