import { AccountModel } from '../models/account'

export interface AuthenticationModel {

    email: string
    password: string
}

export interface Authentication {
    auth: (data: AuthenticationModel) => Promise<AccountModel | null>
}
