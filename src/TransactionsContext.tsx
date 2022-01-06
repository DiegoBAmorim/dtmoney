import {createContext, ReactNode, useEffect, useState} from 'react';
import { api } from './services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// interface TransactionInput {
//     title: string;
//     type: number;
//     amount: number;
//     category: string;
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> //faz com que ele omita os 2 campo id e createdAt

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'category' | 'type'> ele captura o dados que escolhi
interface TransactionProviderProps{
    children: ReactNode //aceita qualquer tipo de conteudo valido para react.
}

interface TransactionContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput)  => void
}
export const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionProvider({children} : TransactionProviderProps) {
    const [transactions, setTransaction] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions').then(response => setTransaction(response.data.transactions))
    }, []);

    function createTransaction(transaction: TransactionInput){

        api.post('/transactions', transaction);
    }
    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

