import { registerEnumType } from '@nestjs/graphql';

export enum CardType {
  TIMES = 'times',
  DURATION = 'duration',
}
registerEnumType(CardType, { name: 'CardType', description: '消费卡类型' });
