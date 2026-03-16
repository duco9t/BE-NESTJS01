import { Controller, Delete, Param, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user-dto";
import { Body, Post, Get } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  async create(@Body() CreateUserDto: CreateUserDto) {
    await this.userService.create(CreateUserDto);
    return { message: "User created successfully" };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() UpdateUserDto: UpdateUserDto) {
    await this.userService.update(id, UpdateUserDto);
    return { message: "User updated successfully" };
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }
}
