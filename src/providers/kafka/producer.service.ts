import { ConfigService } from '@nestjs/config';
import { ProducerRecord } from 'kafkajs';
import { KafkajsProducer } from './kafkajs.producer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProducerService {
  private readonly clientId = 'quiz-client';

  constructor(private readonly configService: ConfigService) {}

  async produce(record: ProducerRecord) {
    const { topic } = record;
    const producer = await this.getProducer(topic);
    return producer.produce(record);
  }

  async getProducer(topic: string) {
    // initialize a new kafka client and initialize a producer from it
    const producer = new KafkajsProducer(topic, {
      clientId: this.clientId,
      ...this.configService.get('kafka'),
    });

    await producer.connect();
    return producer;
  }
}
