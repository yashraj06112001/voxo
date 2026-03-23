import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
//import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
  phone: string;
  password: string;
  name: string;
}
interface userObject {
  phone: string;
  password: string;
  name: string;
}
@Injectable()
export class RegistrationService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  // to create an object
  async create(createRegistrationDto: CreateRegistrationDto) {
    if (createRegistrationDto.phone.length !== 10) {
      throw new Error('Phone number must be 10 digits long');
      return;
    }
    const hashedPassword = await bcrypt.hash(
      createRegistrationDto.password,
      10,
    );

    const newUser: userObject = {
      phone: createRegistrationDto.phone,
      password: hashedPassword,
      name: createRegistrationDto.name,
    };
    const user = await this.userModel.create(newUser);

    return user;
  }

  findAll() {
    return `This action returns all registration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  // update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
  //   return `This action updates a #${id} registration`;
  // }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
