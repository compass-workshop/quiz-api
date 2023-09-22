export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  kafka: {
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
    connectionTimeout: 5000,
    topics: {
      submittedTestTopic: process.env.SUBMITTED_TEST_TOPIC,
      evaluatedTestTopic: process.env.EVALUATED_TEST_TOPIC,
    },
    groupId: process.env.CONSUMER_GROUP_ID,
    producerClientId: process.env.PRODUCER_CLIENT_ID,
  },
  confluentRegistry: {
    host: process.env.SCHEMA_REGISTRY_HOST,
    api_key: process.env.SCHEMA_REGISTRY_API_KEY,
    api_secret: process.env.SCHEMA_REGISTRY_API_SECRET,
  },
  ksqldb: {
    url: process.env.KSQL_URL,
    port: process.env.KSQL_PORT,
    token: process.env.KSQL_TOKEN,
    userLatestResultTable: process.env.LATEST_RESULT_TABLE,
    userAnalyticsTable: process.env.USER_ANALYTICS_TABLE,
  },
});
