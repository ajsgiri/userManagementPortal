import { Role } from "./role"

export interface User {
    $key: string,
    name: string,
    userID: string,
    roles: string[]
}
