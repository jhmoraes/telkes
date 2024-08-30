import { TUserDB } from "../types";
import { BaseDatabase } from "./BaseDataBase";


export class UserDataBase extends BaseDatabase {

    public static TABLE_USERS = 'users'

    public async findUsers(q: string | undefined): Promise<TUserDB[]> {

        let usersDB

        if (q) {
            const result: TUserDB[] = await UserDataBase
                .connection(UserDataBase.TABLE_USERS)
                .where("name", "LIKE", `%${q}%`)

            usersDB = result

        } else {
            const result: TUserDB[] = await UserDataBase
                .connection("users")
            usersDB = result
        }

        return usersDB
    }

    public async findUsersById(id: string | undefined):Promise<TUserDB | undefined>{

        const [ userDBExists ]: TUserDB[] | undefined[] = await UserDataBase
        .connection(UserDataBase.TABLE_USERS)
        .where({ id })

        return userDBExists
    }

    public async insertUser (newUserDB: TUserDB):Promise<void>{

        await UserDataBase
        .connection(UserDataBase.TABLE_USERS)
        .insert(newUserDB)

    }

}