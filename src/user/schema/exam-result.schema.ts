import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'exam-result',
  timestamps: true,
})
export class ExamResult extends Document {
  @Prop({ type: String })
  phone: string;

  @Prop({ type: Number, default: 0 })
  stuNumber: number;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  grade: string;

  @Prop({ type: String })
  ZabanDorost: string;

  @Prop({ type: String })
  ZabanNazade: string;

  @Prop({ type: String })
  ZabanGhalat: string;

  @Prop({ type: String })
  ZabanZarib: string;

  @Prop({ type: String })
  ZabanDarsad: string;

  @Prop({ type: String })
  zehniDorost: string;

  @Prop({ type: String })
  zehniNazade: string;

  @Prop({ type: String })
  zehniGhalat: string;

  @Prop({ type: String })
  zehniZarib: string;

  @Prop({ type: String })
  zehniDarsad: string;

  @Prop({ type: String })
  computerDorost: string;

  @Prop({ type: String })
  computerNazade: string;

  @Prop({ type: String })
  computerGhalat: string;

  @Prop({ type: String })
  computerZarib: string;

  @Prop({ type: String })
  computerDarsad: string;

  @Prop({ type: String })
  hoshDorost: string;

  @Prop({ type: String })
  hoshNazade: string;

  @Prop({ type: String })
  hoshGhalat: string;

  @Prop({ type: String })
  hoshZarib: string;

  @Prop({ type: String })
  hoshDarsad: string;

  @Prop({ type: String })
  madarDorost: string;

  @Prop({ type: String })
  madarNazade: string;

  @Prop({ type: String })
  madarGhalat: string;

  @Prop({ type: String })
  madarZarib: string;

  @Prop({ type: String })
  madarDarsad: string;

  @Prop({ type: String })
  machineDorost: string;

  @Prop({ type: String })
  machineNazade: string;

  @Prop({ type: String })
  machineGhalat: string;

  @Prop({ type: String })
  machineZarib: string;

  @Prop({ type: String })
  machineDarsad: string;

  @Prop({ type: String })
  controlDorost: string;

  @Prop({ type: String })
  controlNazade: string;

  @Prop({ type: String })
  controlGhalat: string;

  @Prop({ type: String })
  controlZarib: string;

  @Prop({ type: String })
  controlDarsad: string;

  @Prop({ type: String })
  ghodratDorost: string;

  @Prop({ type: String })
  ghodratNazade: string;

  @Prop({ type: String })
  ghodratGhalat: string;

  @Prop({ type: String })
  ghodratZarib: string;

  @Prop({ type: String })
  ghodratDarsad: string;

  @Prop({ type: String })
  takhasosiDorost: string;

  @Prop({ type: String })
  takhasosiNazade: string;

  @Prop({ type: String })
  takhasosiGhalat: string;

  @Prop({ type: String })
  takhasosiZarib: string;

  @Prop({ type: String })
  takhasosiDarsad: string;

  @Prop({ type: String })
  score: string;

  @Prop({ type: String })
  x: string;

  @Prop({ type: String })
  s: string;

  @Prop({ type: String })
  z: string;

  @Prop({ type: String })
  t: string;

  @Prop({ type: String })
  lastStudent: string;
}

export const ExamResultSchema = SchemaFactory.createForClass(ExamResult);
