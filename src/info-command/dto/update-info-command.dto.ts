import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoCommandDto } from './create-info-command.dto';

export class UpdateInfoCommandDto extends PartialType(CreateInfoCommandDto) {}
