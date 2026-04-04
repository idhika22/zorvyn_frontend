export type Role="admin"| "viewer";
export type TransactionType="income"| "expense";
export type TransactionStatus="success"|"waiting"|"due_date"|"disabled";

export interface Transaction {
    id:string;
    date:string;
    description:string;
    category:string;
    amount:number;
    type:TransactionType;
    status:TransactionStatus;
    method:string;
    methodLast4:string;
}