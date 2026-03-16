import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user-dto";
export declare class UserService {
    private readonly userReponsitory;
    constructor(userReponsitory: Repository<User>);
    create(CreateUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    update(id: number, UpdateUserDto: any): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
