/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user-dto";

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
    return this.userReponsitory.find();
  }

  //Find Id User
  async findOne(id: number) {
    return this.userReponsitory.findOne({ where: { id } });
  }

  //Update user by id
  async update(id: number, UpdateUserDto) {
    return this.userReponsitory.update(id, UpdateUserDto);
  }

  //Delete user by id
  async delete(id: number) {
    return this.userReponsitory.delete({ id });
  }
}
