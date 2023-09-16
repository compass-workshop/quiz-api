import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkajsConsumer } from './kafkajs.consumer';
import { RegistryService } from './registry.service';

export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
  ) {}

  async consume(message: any) {
    const { topics, groupId } = this.configService.get('kafka');

    const topic = {
      topics: [topics?.submittedTestTopic?.name],
      fromBeginning: false,
    };

    const config = { groupId: groupId };

    const consumer = new KafkajsConsumer(
      topic,
      config,
      this.configService.get('kafka'),
    );
    await consumer.connect();
    await consumer.consumeNew(message);
  }

  async onMessage(message) {
    const key = message.key;
    const decodedMessage: any = await this.registryService.decode(
      message.value,
    );

    this.logger.log('Consumed message:', {
      key: key,
      value: decodedMessage,
    });
  }
}
