export interface TransactionWebhookPayload {
    requesttransactionid: string;
    transactionid: string;
    responsecode?: string;
    status: string;
    statusdesc?: string;
    referenceno?: string;
}