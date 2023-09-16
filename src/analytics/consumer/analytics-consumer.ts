import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegistryService } from '../../providers/kafka/registry.service';
import { SubmittedTest } from '../interfaces/submitted-test.interface';
import { ConsumerService } from 'src/providers/kafka/consumer.service';

@Injectable()
export class AnalyticsConsumer implements OnModuleInit {
  private readonly logger = new Logger(AnalyticsConsumer.name);

  constructor(
    private readonly consumerService: ConsumerService,
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
  ) {}

  async onModuleInit() {
    const { topics, groupId } = this.configService.get('kafka');

    await this.consumerService.consume({
      topic: {
        topics: [topics?.evaluatedTestTopic?.name],
        fromBeginning: true,
      },
      config: { groupId: groupId },

      onMessage: async (message) => {
        const key = message.key;
        const decodedMessage: SubmittedTest = await this.registryService.decode(
          message.value,
        );

        this.logger.log(
          `Consumed message from ${topics?.evaluatedTestTopic?.name}: `,
          {
            key: key,
            value: decodedMessage,
          },
        );
      },
    });
  }
}
