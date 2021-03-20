import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';

export type InfoCommandDoc = InfoCommand & Document;

@Schema()
export class InfoCommand {
	@Prop({ required: true })
	channel: string;

	@Prop({ required: true })
	cmd: string;

	@Prop({ required: true })
	info: string;
}

export const InfoCommandSchema = SchemaFactory.createForClass(InfoCommand);
//export const InfoCommandModel = model("InfoCommand",InfoCommandSchema)
