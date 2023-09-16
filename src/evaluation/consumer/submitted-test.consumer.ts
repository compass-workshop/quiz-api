import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegistryService } from '../../providers/kafka/registry.service';
import { SubmittedTest } from '../interfaces/submitted-test.interface';
import { ConsumerService } from 'src/providers/kafka/consumer.service';
import { EvaluateScoreService } from '../evaluate-score.service';

@Injectable()
export class SubmittedTestConsumer implements OnModuleInit {
  private readonly logger = new Logger(SubmittedTestConsumer.name);

  constructor(
    private readonly consumerService: ConsumerService,
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
    private readonly evaluateScoreService: EvaluateScoreService,
  ) { }

  async onModuleInit() {
    const { topics, groupId } = this.configService.get('kafka');

    await this.consumerService.consume({
      topic: {
        topics: [topics?.submittedTestTopic?.name],
        fromBeginning: true,
      },
      config: { groupId: groupId },

      onMessage: async (message) => {
        const key = message.key;
        const decodedMessage: SubmittedTest = await this.registryService.decode(
          message.value,
        );

        this.logger.log(
          `Consumed message from ${topics?.submittedTestTopic?.name} topic: `,
          {
            key: key,
            value: decodedMessage,
          },
        );

        this.evaluateScoreService.evaluateTest(decodedMessage);
      },
    });
  }
}
