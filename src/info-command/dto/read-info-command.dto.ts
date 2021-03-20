import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateInfoCommandDto } from './create-info-command.dto';

export class ReadInfoCommandDto extends PartialType(
	OmitType(CreateInfoCommandDto, ['info'] as const),
) {}
