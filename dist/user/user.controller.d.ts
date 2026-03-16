import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user-dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(CreateUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./entity/user.entity").User[]>;
    findOne(id: number): Promise<import("./entity/user.entity").User | null>;
    update(id: number, UpdateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
