export interface SubscriptionCreateDto{
    user_id: number;
    code: string;
    amount: number;
    cron: string;
}

export interface SubscriptionUpdateDto{    
    code: string;
    amount: number;
    cron: string;
}