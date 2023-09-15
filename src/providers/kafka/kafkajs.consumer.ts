import { Logger } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopics,
  Kafka,
  KafkaConfig,
  KafkaMessage,
} from 'kafkajs';
import { sleep, retry } from 'radash';
import { RegistryService } from './registry.service';
// import { IConsumer } from '../../common/interfaces/consumer.interface';

export class KafkajsConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: ConsumerSubscribeTopics,
    config: ConsumerConfig,
    kafkaConfig: KafkaConfig,
    private readonly registryService: RegistryService,
  ) {
    this.kafka = new Kafka(kafkaConfig);
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic.topics.join(',')}-${config.groupId}`);
  }

  // async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
  //   await this.consumer.subscribe(this.topic);
  //   await this.consumer.run({
  //     eachMessage: async ({ message, partition }) => {
  //       this.logger.debug(`Processing message partition: ${partition}`);
  //       try {
  //         await retry({ times: 2 }, async () => onMessage(message));
  //       } catch (error) {
  //         this.logger.error('Error consuming message..', error);
  //       }
  //     },
  //   });
  // }


  async consumeNew(message) {
    await this.consumer.subscribe(this.topic);
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        try {
          this.onMessage(message);
        } catch (error) {
          this.logger.error('Error consuming message..', error);
        }
      },
    });
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

  async connect() {
    try {
      await this.consumer.connect();
    } catch (error) {
      this.logger.error('Failed to connect to Kafka.', error);
      await sleep(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
