import { ConfigService } from '@nestjs/config';
import { ProducerRecord } from 'kafkajs';
import { KafkajsProducer } from './kafkajs.producer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProducerService {
  private producers = {};

  constructor(private readonly configService: ConfigService) {}

  async produce(record: ProducerRecord) {
    const { topic } = record;

    const producer = await this.getProducer(topic);
    return producer.produce(record);
  }

  async getProducer(topic: string) {
    const { producerClientId } = this.configService.get('kafka');

    // initialize a new kafka client and initialize a producer from it
    let producer: KafkajsProducer;

    if (this.producers[topic]) {
      producer = this.producers[topic];
    } else {
      producer = new KafkajsProducer(topic, {
        clientId: producerClientId,
        ...this.configService.get('kafka'),
      });
    }

    await producer.connect();
    return producer;
  }
}
