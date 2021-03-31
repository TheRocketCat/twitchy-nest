import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AutoCommandDoc = AutoCommand & Document;

@Schema()
export class AutoCommand {
	@Prop({ required: true })
	channel: string;

	@Prop({ required: true })
	name: string;

	//milliseconds in seconds
	@Prop({ required: true })
	interval: number;

	@Prop({ required: true })
	info: string;
}

export const AutoCommandSchema = SchemaFactory.createForClass(AutoCommand);
