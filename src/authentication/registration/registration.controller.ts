import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid phone number' })
  async create(@Body() createRegistrationDto: CreateRegistrationDto) {
    const checkAvailablity = await this.registrationService.findOne(
      createRegistrationDto.phone,
    );
    if (checkAvailablity) {
      return { message: 'User with this phone number already exists' };
    }

    return this.registrationService.create(createRegistrationDto);
  }

  @Get('/findAll')
  async findAll() {
    return await this.registrationService.findAll();
  }

  @Get(':phoneNumber/findOne')
  async findOne(@Param('phoneNumber') phoneNumber: string) {
    return await this.registrationService.findOne(phoneNumber);
  }

  @Patch(':phoneNumber')
  async update(
    @Param('phoneNumber') phoneNumber: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    return await this.registrationService.update(
      phoneNumber,
      updateRegistrationDto,
    );
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.registrationService.remove(+id);
  // }
}
