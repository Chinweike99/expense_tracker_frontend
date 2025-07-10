export type UserRole = 'admin' | 'user';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    isEmailVerified: boolean;
    twoFactorEnabled: boolean;
    createdAt: string; // ISO string instead of Date
    updatedAt: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    // confirmPassword: string; 
}


export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    role?: UserRole;
    twoFactorEnabled?: boolean;
}

export type TransactionType = 'expense' | 'income' | 'transfer';

export interface Transaction {
    _id: string;
    account: string | any,
    amount: number;
    description: string;
    date: string; 
    type: TransactionType;
    categoryId: string; 
    accountId: string;
    userId: string;
    tags: string[];
    notes: string;
    isRecurring: boolean;
    recurringId?: string;
    nextRecurringDate?: string;
    frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    splitTransactions?: {
        amount: number;
        description: string;
        userId: string;
        paid: boolean;
    }[];
    createdAt: string;
    updatedAt: string;
}

export interface RecurringTransaction {
    id: string;
    amount: number;
    description: string;
    type: TransactionType;
    category: string; // Category ID
    account: string; // Account ID
    user: string; // User ID
    tags: string[];
    notes: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    nextRecurringDate: string; // ISO date string
    isActive: boolean; // Whether the recurring transaction is currently active
    splitTransactions?: {
        amount: number;
        description: string;
        userId: string;
        paid: boolean;
    }[];
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface CreateTransactionRequest {
    amount: number;
    description: string;
    date: string;
    type: TransactionType;
    categoryId: string;
    accountId: string;
    tags?: string[];
    notes?: string;
    isRecurring?: boolean;
    frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    splitTransactions?: {
        amount: number;
        description: string;
        userId: string;
        paid: boolean;
    }[];
}

export type ReminderType = 'bill' | 'subscription' | 'debt' | 'custom';
export type ReminderFrequency = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';
export type NotificationMethod = 'email' | 'push' | 'both';

// export interface Reminder {
//     _id: string;
//     name: string;
//     type: ReminderType;
//     amount?: number;
//     dueDate: string;
//     frequency: ReminderFrequency;
//     userId: string;
//     transactionId?: string;
//     category?: string;
//     notes?: string;
//     isActive: boolean;
//     notification: {
//         method: NotificationMethod;
//         daysBefore: number[];
//         lastSent?: string;
//     };
//     createdAt: string;
//     updatedAt: string;
// }

export type DebtType = 'loan' | 'credit_card' | 'mortgage' | 'personal';
export type PaymentFrequency = 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'yearly';

// export interface Debt {
//     _id: string;
//     name: string;
//     type: DebtType;
//     initialAmount: number;
//     currentAmount: number;
//     interestRate: number;
//     paymentFrequency: PaymentFrequency;
//     paymentAmount: number;
//     startDate: string;
//     endDate?: string;
//     userId: string;
//     accountId?: string;
//     lender: string;
//     isPaid: boolean;
//     notes?: string;
//     createdAt: string;
//     updatedAt: string;
// }

export interface Currency {
    _id: string;
    code: string;
    name: string;
    symbol: string;
    userId: string;
    isPrimary: boolean;
    exchangeRate?: number;
    lastUpdated?: string;
}

export interface Category {
    _id: string;
    name: string;
    icon: string;
    color: string;
    type: 'income' | 'expense';
    userId: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export type BudgetPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type RolloverType = 'none' | 'full' | 'partial';

// export interface Budget {
//     _id: string;
//     name: string;
//     amount: number;
//     period: BudgetPeriod;
//     startDate: string;
//     endDate?: string;
//     categoryId?: string;
//     userId: string;
//     isRecurring: boolean;
//     rollover: {
//         type: RolloverType;
//         maxAmount?: number;
//     };
//     notifications: {
//         method: string;
//         enabled: boolean;
//         threshold: number;
//     };
//     createdAt: string;
//     updatedAt: string;
//     spendAmount?: number;
//     remainingAmount?: number;
//     progressPercentage?: number;
// }


export interface Budget {
    id: string;
    name: string;
    amount: number;
    category: string;
    period: "weekly" | "monthly" | "yearly";
    startDate: string;
    endDate?: string;
    rollover: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface BudgetProgress extends Budget {
    spent: number;
    remaining: number;
    percentageUsed: number;
  }
  
  export interface BudgetForecast {
    month: string;
    projectedSpending: number;
    averageSpending: number;
    suggestedBudget: number;
  }
  
  export interface BudgetAlert {
    id: string;
    budgetId: string;
    budgetName: string;
    type: "threshold" | "overspend";
    message: string;
    threshold?: number;
    amount?: number;
    createdAt: string;
    read: boolean;
  }


  export interface Reminder {
    id: string;
    title: string;
    description?: string;
    amount?: number;
    dueDate: string;
    frequency?: "once" | "daily" | "weekly" | "monthly" | "yearly";
    type: "bill" | "payment" | "custom";
    category?: string;
    accountId?: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Debt {
    id: string;
    name: string;
    initialAmount: number;
    currentAmount: number;
    interestRate?: number;
    minimumPayment?: number;
    dueDate: string;
    creditor?: string;
    accountId?: string;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface DebtPayment {
    id: string;
    debtId: string;
    amount: number;
    date: string;
    notes?: string;
    createdAt: string;
  }
  
  export interface PayoffPlan {
    monthlyPayment: number;
    payoffDate: string;
    totalInterest: number;
    totalAmount: number;
    schedule: {
      date: string;
      payment: number;
      principal: number;
      interest: number;
      remainingBalance: number;
    }[];
  }















export interface Account {
    _id: string;
    name: string;
    type: 'cash' | 'credit card' | 'investment' | 'loan' | 'other';
    balance: number;
    currency: string;
    userId: string;
    isActive: boolean;
    createdAt: string; 
    updatedAt: string;
}

// Utility types for API responses
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// Form types for create/update operations
export interface CreateCategoryRequest {
    name: string;
    icon: string;
    color: string;
    type: 'income' | 'expense';
    isDefault?: boolean;
}

export interface CreateAccountRequest {
    name: string;
    type: 'cash' | 'credit card' | 'investment' | 'loan' | 'other';
    balance: number;
    currency: string;
    isActive?: boolean;
}

export interface CreateBudgetRequest {
    name: string;
    amount: number;
    period: BudgetPeriod;
    startDate: string;
    endDate?: string;
    categoryId?: string;
    isRecurring?: boolean;
    rollover?: {
        type: RolloverType;
        maxAmount?: number;
    };
    notifications?: {
        method: string;
        enabled: boolean;
        threshold: number;
    };
}

export interface ApiError {
    response?: {
        data?: {
            errors?: { message: string; path: string[] }[];
            message?: string;
        };
    };
}
