export interface UserInput{
    id:string
    name:string;
    email:string;
    password:string;
    account: string;
}

export interface GetUsers{
    email?:string;
    id:string;
 }