import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
//import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { FindAllRegistrationDto } from './dto/find-all-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

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

  async findAll() {
    const users = await this.userModel.find().exec();
    const userDtos: FindAllRegistrationDto[] = users.map((user) => ({
      identity: user._id.toString(),
      name_of_the_user: user.name,
      phone_number_of_the_user: user.phone,
    }));
    return userDtos;
  }

  async findOne(phoneNumber: string) {
    const user: User | null = await this.userModel
      .findOne({ phone: phoneNumber })
      .exec();
    if (!user) {
      return null;
    } else {
      const userPrint = {
        identity: user._id.toString(),
        name_of_the_user: user.name,
        phone_number_of_the_user: user.phone,
      };
      return userPrint;
    }
  }

  async update(
    phoneNumber: string,
    updateRegistrationDto: UpdateRegistrationDto,
  ) {
    const availableFields = await this.userModel
      .findOne({ phone: phoneNumber })
      .exec();
    if (!availableFields) {
      return {
        message: 'User with this phone number does not exist',
      };
    } else {
      const hashedUpdatedPassoword = await bcrypt.hash(
        updateRegistrationDto.updatedPassword!,
        10,
      );
      await this.userModel.updateOne(
        { phone: phoneNumber },
        {
          $set: {
            name: updateRegistrationDto.updatedName,
            password: hashedUpdatedPassoword,
          },
        },
      );
      return {
        message: 'User updated successfully',
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
