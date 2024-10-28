
import { prisma } from "../prisma/client";
import { TransactionsInput } from "../utils/types/transactions";


const createTransaction = async ({ accountId, amount, type , status }: TransactionsInput) => {

    console.log("------repository:createTransaction---------");

    try {

        const transaction = await prisma.transaction.create({data:{
            amount: amount,
            status: status,
            accountId: accountId,
            type: type
            
        }})

        if(!transaction){
            throw new Error("create Transaction failed. Please try again.");
        }
  
        // Return the updated receiver account details if successful
        return transaction;
        
    } catch (error) {
        throw new Error("Something went wrong");
        
    }

};

export { createTransaction };