/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user-dto";

console.log("__dirname =", __dirname);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userReponsitory: Repository<User>,
  ) {}

  //create user
  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userReponsitory.create(CreateUserDto);
    return await this.userReponsitory.save(newUser);
  }

  //Find All Users
  async findAll() {
    const users = await this.userReponsitory.find();

    if (!users || users.length === 0) {
      throw new ForbiddenException("No users found");
    }
    return users;
  }

  //Find Id User
  async findOne(id: number) {
    const user = await this.userReponsitory.findOne({ where: { id } });

    if (!user) {
      throw new ForbiddenException("User not found");
    }
    return user;
    // return this.userReponsitory.findOne({ where: { id } });
  }

  //Update user by id
  async update(id: number, UpdateUserDto) {
    return this.userReponsitory.update(id, UpdateUserDto);
  }

  //Delete user by id
  async delete(id: number) {
    return this.userReponsitory.delete({ id });
  }

  //Query user by userId
  async findByUserId(id: number, status: string = "active") {
    return this.userReponsitory.findOne({ where: { id, status } });
  }

  //Query user by status
  async findByStatus(status: string) {
    return this.userReponsitory.find({ where: { status: status } });
  }
}
