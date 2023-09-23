import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegistryService } from '../../providers/kafka/registry.service';
import { EvaluatedTestMsg } from 'src/evaluation/interfaces/evaluated-test.interface';
import { ConsumerService } from 'src/providers/kafka/consumer.service';
import { AnalyticsStreamService } from './analytics-stream.service';

@Injectable()
export class SubmittedTestConsumer implements OnModuleInit {
  private readonly logger = new Logger(SubmittedTestConsumer.name);

  constructor(
    private readonly consumerService: ConsumerService,
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
    private readonly analyticsStreamService: AnalyticsStreamService,
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
        const decodedMessage: EvaluatedTestMsg =
          await this.registryService.decode(message.value);

        this.logger.log(
          `Consumed message from ${topics?.evaluatedTestTopic?.name} topic: `,
          {
            key: key,
            value: decodedMessage,
          },
        );

        // User analytics stream data
        const streamData = {
          USERID: decodedMessage.user.id,
          TESTID: decodedMessage.testId,
          SCORE: decodedMessage.evaluation.rawScore,
        };

        // Post data to user analytics stream
        this.analyticsStreamService.insertDataToUserAnalyticsStream(streamData);
      },
    });
  }
}
