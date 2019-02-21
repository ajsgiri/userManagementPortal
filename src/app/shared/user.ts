import { Role } from "./role"

export interface User {
    $key: string,
    name: string,
    email: string,
    userID: string,
    roles: string[]
}
