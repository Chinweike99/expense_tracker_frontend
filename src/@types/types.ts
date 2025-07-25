export type UserRole = "admin" | "user";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
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

export type TransactionType = "expense" | "income" | "transfer";

export interface Transaction {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  account: string | any;
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
  frequency?: "daily" | "weekly" | "monthly" | "yearly";
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
  category: string;
  account: string;
  user: string;
  tags: string[];
  notes: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  nextRecurringDate: string;
  isActive: boolean;
  splitTransactions?: {
    amount: number;
    description: string;
    userId: string;
    paid: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
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
  frequency?: "daily" | "weekly" | "monthly" | "yearly";
  splitTransactions?: {
    amount: number;
    description: string;
    userId: string;
    paid: boolean;
  }[];
}

export type ReminderType = "bill" | "subscription" | "debt" | "custom";
export type ReminderFrequency =
  | "once"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";
export type NotificationMethod = "email" | "push" | "both";

// export type DebtType = "loan" | "credit_card" | "mortgage" | "personal";
// export type PaymentFrequency =
//   | "weekly"
//   | "bi-weekly"
//   | "monthly"
//   | "quarterly"
//   | "yearly";

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
  type: "income" | "expense";
  userId: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BudgetPeriod = "weekly" | "monthly" | "quarterly" | "yearly";
export type RolloverType = "none" | "full" | "partial";

export interface Budget {
  _id: string;
  name: string;
  amount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: string | any;
  period: "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rollover: boolean | any;
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
  _id: string;
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
  _id: string;
  name: string;
  title: string;
  description?: string;
  notes: string;
  amount?: number;
  dueDate: string;
  frequency?: "once" | "daily" | "weekly" | "monthly" | "yearly";
  type: ReminderType;
  category?: string;
  accountId?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type DebtType = "loan" | "credit-card" | "mortgage" | "personal";
export type PaymentFrequency = "weekly" | "bi-weekly" | "monthly" | "yearly";

export interface Debt {
  _id: string;
  name: string;
  type: DebtType;
  initialAmount: number;
  currentAmount: number;
  interestRate: number;
  paymentFrequency: PaymentFrequency;
  paymentAmount: number;
  startDate: string;
  endDate?: string;
  lender: string;
  accountId?: string;
  isPaid: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDebtRequest {
  name: string;
  type: DebtType;
  initialAmount: number;
  currentAmount: number;
  interestRate: number;
  paymentFrequency: PaymentFrequency;
  paymentAmount: number;
  startDate: string;
  endDate?: string;
  lender: string;
  accountId?: string;
  notes?: string;
}

export interface DebtPayment {
  _id: string;
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
  type: "cash" | "credit card" | "investment" | "loan" | "other";
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
  type: "income" | "expense";
  isDefault?: boolean;
}

export interface CreateAccountRequest {
  name: string;
  type: "cash" | "credit card" | "investment" | "loan" | "other";
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

export type ConfettiOptions = {
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  gravity?: number;
  ticks?: number;
  particleCount?: number;
  origin?: { x?: number; y?: number };
  zIndex?: number;
  disableForReducedMotion?: boolean;
  shapes?: string[];
  colors?: string[];
};
