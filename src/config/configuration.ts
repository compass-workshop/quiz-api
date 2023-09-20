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
      submittedTestTopic: {
        eventName: 'submittedTest',
        name: `gcp.eu-west-2.workshop.test.dev.fct.test-submitted.0`,
      },
      evaluatedTestTopic: {
        eventName: 'evaluatedTest',
        name: `gcp.eu-west-2.workshop.test.dev.fct.test-evaluated.0`,
      },
    },
    groupId: `quiz-groupid`,
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
    userAnalyticsTable: 'USER_ANALYTICS_TABLE',
  },
});
