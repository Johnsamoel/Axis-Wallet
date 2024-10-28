export interface CreateAccount{
    userId: string;
}

export interface DepositeAccount{
    amount: number;
    accountId: string;
}

export interface WithdrawAccount {
    receiver: string;
    amount: number;
}