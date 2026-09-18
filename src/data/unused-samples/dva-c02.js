const questions = [
  // ---------------- Development with AWS Services ----------------
  {
    id: 'dva-001',
    domain: 'Development with AWS Services',
    question:
      "A developer is building a user registration service that stores accounts in an Amazon DynamoDB table with UserId as the partition key. Two requests with the same UserId can arrive at nearly the same time, and the second request must never overwrite the first account. What should the developer do?",
    options: [
      'Use a Scan operation before each PutItem call to check whether the UserId already exists',
      'Enable DynamoDB Streams and delete duplicate items with an AWS Lambda function',
      'Call PutItem with a ConditionExpression of attribute_not_exists(UserId)',
      'Use a strongly consistent GetItem call before each PutItem call',
    ],
    answer: [2],
    explanation:
      'A conditional write with attribute_not_exists on the partition key is evaluated atomically by DynamoDB, so the second write fails with a ConditionalCheckFailedException instead of overwriting the item. Reading first (with GetItem or Scan) leaves a race window between the read and the write, and cleaning up afterward with Streams lets the overwrite happen first.',
  },
  {
    id: 'dva-002',
    domain: 'Development with AWS Services',
    question:
      'An application polls an Amazon SQS standard queue and processes each message in a worker. Processing sometimes takes longer than usual, and the team notices that some messages are processed twice by different workers. Which change will MOST directly reduce this duplicate processing?',
    options: [
      'Increase the visibility timeout of the queue so it is longer than the maximum processing time',
      'Decrease the message retention period of the queue',
      'Enable long polling by increasing the ReceiveMessageWaitTimeSeconds value',
      'Add a delay queue setting so that new messages are hidden when first sent',
    ],
    answer: [0],
    explanation:
      'If a worker does not delete a message before the visibility timeout expires, the message becomes visible again and another worker can receive it. Setting the visibility timeout longer than the processing time (or extending it with ChangeMessageVisibility) prevents this. Long polling, retention period, and delay queues do not control how long an in-flight message stays hidden.',
  },
  {
    id: 'dva-003',
    domain: 'Development with AWS Services',
    question:
      "An existing Amazon DynamoDB table uses OrderId as its partition key. A new feature must efficiently retrieve all orders for a given CustomerId, sorted by OrderDate. The table is already in production and cannot be recreated. What should the developer do?",
    options: [
      'Add a local secondary index with CustomerId as the partition key and OrderDate as the sort key',
      'Use a Scan operation with a FilterExpression on CustomerId and sort the results in the application',
      'Change the partition key of the table to CustomerId by using the UpdateTable API',
      'Add a global secondary index with CustomerId as the partition key and OrderDate as the sort key',
    ],
    answer: [3],
    explanation:
      "A global secondary index can use a different partition key from the base table and can be added to an existing table, so it supports an efficient Query by CustomerId sorted by OrderDate. A local secondary index must share the table's partition key and can only be created when the table is created. A Scan reads the whole table and is inefficient, and a table's primary key cannot be changed after creation.",
  },
  {
    id: 'dva-004',
    domain: 'Development with AWS Services',
    question:
      'A team maintains a dozen AWS Lambda functions written in Python. All of them use the same internal utility library and the same third-party dependencies. The team wants to stop packaging these dependencies into every deployment package and update them in one place. What should the developer use?',
    options: [
      'Lambda environment variables that point to a shared Amazon S3 location',
      'A Lambda layer that contains the shared library and dependencies',
      'Lambda provisioned concurrency for each function',
      'A Lambda alias that is shared across all functions',
    ],
    answer: [1],
    explanation:
      'A Lambda layer is an archive of libraries or other content that can be attached to multiple functions, so shared code is packaged and versioned once. Environment variables only hold configuration strings, provisioned concurrency keeps execution environments initialized, and aliases are pointers to function versions; none of them share code between functions.',
  },
  {
    id: 'dva-005',
    domain: 'Development with AWS Services',
    question:
      'A product catalog service reads items from an Amazon RDS database and is adding Amazon ElastiCache to reduce database load. Only a small fraction of items are read frequently, and the team wants the cache to hold only items that are actually requested. Slightly stale data is acceptable for a short time. Which caching strategy should the developer implement?',
    options: [
      'Write-through caching with no expiration so that every database write also updates the cache',
      'Pre-loading the entire catalog into the cache every time the application starts',
      'Lazy loading, populating the cache on a cache miss, combined with a time to live (TTL) on each key',
      'Read replicas of the RDS database instead of a cache',
    ],
    answer: [2],
    explanation:
      'Lazy loading only writes an item to the cache after a cache miss, so the cache contains only data that is requested, and a TTL limits how long stale data can be served. Write-through and pre-loading put every item in the cache, including items that are rarely read. Read replicas scale reads but do not add an in-memory cache layer.',
  },
  {
    id: 'dva-006',
    domain: 'Development with AWS Services',
    question:
      'Whenever an item in an Amazon DynamoDB table is inserted or modified, a developer must send the new version of the item to a downstream analytics service. The solution must not require changes to the application code that writes to the table. What is the MOST suitable approach?',
    options: [
      'Enable DynamoDB Streams with the NEW_IMAGE view type and process the stream with an AWS Lambda function',
      'Schedule an AWS Lambda function to scan the table every minute and detect changed items',
      'Configure an Amazon S3 event notification on the table',
      'Enable DynamoDB point-in-time recovery and read the backups',
    ],
    answer: [0],
    explanation:
      'DynamoDB Streams captures item-level changes in order, and a Lambda event source mapping can process each change using the new item image, without changing the writer code. Periodic scans are inefficient and can miss intermediate changes. S3 event notifications apply to S3 buckets, not DynamoDB tables, and point-in-time recovery is for restoring data, not for change processing.',
  },
  {
    id: 'dva-007',
    domain: 'Development with AWS Services',
    question:
      'An AWS Lambda function is invoked asynchronously by Amazon EventBridge. After Lambda exhausts its retries, some events still fail. The developer must keep these failed events so they can be investigated and reprocessed later. Which configurations will meet this requirement? (Choose TWO.)',
    options: [
      'Increase the memory setting of the function',
      'Configure an on-failure destination for asynchronous invocations that points to an Amazon SQS queue',
      'Enable provisioned concurrency on the function',
      'Increase the visibility timeout on the function',
      'Configure a dead-letter queue for the function that points to an Amazon SNS topic or Amazon SQS queue',
    ],
    answer: [1, 4],
    explanation:
      'For asynchronous invocations, Lambda can send events that fail all retry attempts to an on-failure destination (which also includes details about the invocation and error) or to a dead-letter queue backed by SQS or SNS. Memory and provisioned concurrency affect performance, not failed-event handling, and visibility timeout is an SQS queue setting, not a Lambda function setting.',
  },
  {
    id: 'dva-008',
    domain: 'Development with AWS Services',
    question:
      'A mobile app lets users upload profile photos to a private Amazon S3 bucket. The developer does not want to give the app long-term AWS credentials or route the file bytes through the backend servers. What is the MOST appropriate solution?',
    options: [
      'Make the bucket public for writes and restrict reads with a bucket policy',
      'Embed an IAM user access key in the mobile app with permission to call PutObject',
      'Upload the photos to the backend over HTTPS and have the backend copy them to S3',
      'Have the backend generate a presigned URL for a PUT request and return it to the app for the upload',
    ],
    answer: [3],
    explanation:
      'A presigned URL grants time-limited permission to perform a specific operation on a specific object, signed with the backend credentials, so the client uploads directly to S3 without holding AWS credentials. Embedding access keys in an app is insecure, public write access is a serious risk, and proxying the upload through the backend is exactly what the team wants to avoid.',
  },

  // ---------------- Security ----------------
  {
    id: 'dva-009',
    domain: 'Security',
    question:
      'A web application signs users in with an Amazon Cognito user pool. After signing in, each user must be able to read and write objects directly in their own prefix of an Amazon S3 bucket by using the AWS SDK in the browser. What should the developer add?',
    options: [
      'An API Gateway API key for each user',
      'An IAM user for each application user',
      'A Cognito identity pool that trusts the user pool and exchanges tokens for temporary AWS credentials',
      'A Cognito user pool app client secret embedded in the browser code',
    ],
    answer: [2],
    explanation:
      'Cognito identity pools exchange an authenticated identity, such as a user pool token, for temporary AWS credentials tied to an IAM role, and the role policy can use the identity ID to limit access to a per-user prefix. User pools handle authentication and issue JWTs but do not by themselves provide AWS credentials. Creating IAM users per app user or exposing secrets in browser code is insecure and does not scale.',
  },
  {
    id: 'dva-010',
    domain: 'Security',
    question:
      'A company exposes a REST API through Amazon API Gateway. Clients send a bearer token issued by a third-party identity provider that is not Amazon Cognito. The token must be validated with custom logic before requests reach the backend. What should the developer configure?',
    options: [
      'A Lambda authorizer that validates the token and returns an IAM policy',
      'A Cognito user pool authorizer',
      'IAM authorization with Signature Version 4 on each method',
      'A usage plan with API keys',
    ],
    answer: [0],
    explanation:
      'A Lambda authorizer runs custom code to validate a token or request parameters and returns an IAM policy that allows or denies the call, which fits a third-party token. A Cognito user pool authorizer only validates tokens issued by a Cognito user pool, IAM authorization requires AWS-signed requests, and API keys are meant for usage tracking and throttling, not authentication.',
  },
  {
    id: 'dva-011',
    domain: 'Security',
    question:
      'An application must encrypt large files before storing them, using a key managed in AWS KMS. The files are too large to send directly to the KMS Encrypt API. How should the developer implement the encryption?',
    options: [
      'Split each file into small chunks and call the KMS Encrypt API for every chunk',
      'Export the KMS key material and use it to encrypt the files locally',
      'Store the files unencrypted and enable CloudTrail logging on the KMS key',
      'Call GenerateDataKey, encrypt the file locally with the plaintext data key, store the encrypted data key with the file, and discard the plaintext key',
    ],
    answer: [3],
    explanation:
      'This is envelope encryption: KMS returns a plaintext and an encrypted copy of a data key, the plaintext key encrypts the data locally, and only the encrypted key is stored so it can later be decrypted with KMS. Calling Encrypt for many chunks is slow and inefficient, KMS keys cannot be exported from the service, and logging does not encrypt anything.',
  },
  {
    id: 'dva-012',
    domain: 'Security',
    question:
      'An application connects to an Amazon RDS database. Security policy requires that the database password be stored encrypted and rotated automatically on a schedule, with minimal custom code. Which service should the developer use to store the password?',
    options: [
      'AWS Systems Manager Parameter Store as a String parameter',
      'AWS Secrets Manager with automatic rotation enabled',
      'An encrypted AWS Lambda environment variable',
      'An Amazon S3 object encrypted with SSE-S3',
    ],
    answer: [1],
    explanation:
      'Secrets Manager stores secrets encrypted with KMS and has built-in automatic rotation, including managed rotation support for Amazon RDS credentials. Parameter Store can store encrypted SecureString values but does not provide native automatic rotation, and a plain String parameter is not encrypted. Environment variables and S3 objects would require custom rotation logic.',
  },
  {
    id: 'dva-013',
    domain: 'Security',
    question:
      'A developer is writing an AWS Lambda function that reads and writes items in an Amazon DynamoDB table. What is the MOST secure way to give the function access to the table?',
    options: [
      'Store an IAM user access key and secret key in the function environment variables',
      'Hardcode IAM user credentials in the function code and encrypt the deployment package',
      'Grant the required DynamoDB permissions for that table to the function execution role',
      'Add a resource-based policy to the function that allows dynamodb:* actions',
    ],
    answer: [2],
    explanation:
      "A Lambda function assumes its execution role, and the SDK automatically uses the role's temporary credentials, so granting least-privilege DynamoDB permissions to that role avoids long-term keys. Storing access keys in code or environment variables risks exposure and requires manual rotation. A function's resource-based policy controls who can invoke the function, not what the function can access.",
  },
  {
    id: 'dva-014',
    domain: 'Security',
    question:
      'An application running on Amazon EC2 instances needs to upload reports to a single Amazon S3 bucket. The security team requires least privilege and no long-term credentials on the instances. Which actions should the developer take? (Choose TWO.)',
    options: [
      'Attach an IAM role to the instances through an instance profile',
      'Create an IAM user and save its access keys in the AWS CLI credentials file on each instance',
      'Grant the AmazonS3FullAccess managed policy to the application',
      'Write a policy that allows only s3:PutObject on the ARN of the specific bucket and its objects',
      'Enable default encryption on the bucket',
    ],
    answer: [0, 3],
    explanation:
      'An instance profile gives the EC2 instances temporary, automatically rotated credentials for an IAM role, and a policy scoped to s3:PutObject on only the required bucket enforces least privilege. IAM user keys on disk are long-term credentials, AmazonS3FullAccess grants far more than needed, and bucket encryption protects data at rest but does not control access.',
  },
  {
    id: 'dva-015',
    domain: 'Security',
    question:
      'A compliance requirement states that objects in an Amazon S3 bucket must be encrypted at rest, that the company must control the key policy, and that every use of the encryption key must be auditable in AWS CloudTrail. Which encryption option should the developer choose?',
    options: [
      'Server-side encryption with Amazon S3 managed keys (SSE-S3)',
      'Server-side encryption with an AWS KMS customer managed key (SSE-KMS)',
      'Client-side encryption with a key hardcoded in the application',
      'Enabling S3 Versioning and MFA Delete on the bucket',
    ],
    answer: [1],
    explanation:
      "With SSE-KMS and a customer managed key, the company controls the key policy and KMS API calls for the key are recorded in CloudTrail. SSE-S3 keys are managed entirely by S3, so the company cannot manage a key policy or audit individual key use. A hardcoded key is insecure, and Versioning with MFA Delete protects against deletion but does not encrypt data.",
  },

  // ---------------- Deployment ----------------
  {
    id: 'dva-016',
    domain: 'Deployment',
    question:
      'A team deploys a new version of an AWS Lambda function by using AWS CodeDeploy. They want 10 percent of traffic to go to the new version first and, if no alarms fire after a short waiting period, send all remaining traffic to it at once. Which deployment configuration type should they choose?',
    options: [
      'All-at-once',
      'Linear',
      'Canary',
      'In-place with a rolling batch',
    ],
    answer: [2],
    explanation:
      'A canary configuration shifts a percentage of traffic to the new Lambda version, waits for a set interval, and then shifts the rest in one step, which matches the requirement. Linear shifts traffic in equal increments at regular intervals, and all-at-once moves all traffic immediately. Lambda deployments in CodeDeploy use traffic shifting between versions, not in-place rolling batches.',
  },
  {
    id: 'dva-017',
    domain: 'Deployment',
    question:
      'A developer uses AWS CodeDeploy for in-place deployments to Amazon EC2 instances. After the application is installed and started, a script must run smoke tests to confirm that the service responds correctly before the deployment is marked successful. Which appspec.yml lifecycle event hook should run this script?',
    options: [
      'BeforeInstall',
      'ApplicationStop',
      'AfterInstall',
      'ValidateService',
    ],
    answer: [3],
    explanation:
      'ValidateService runs after ApplicationStart and is intended for verifying that the deployment completed successfully, so smoke tests belong there. BeforeInstall and AfterInstall run before the application has started, and ApplicationStop runs at the beginning of the deployment to stop the currently running version.',
  },
  {
    id: 'dva-018',
    domain: 'Deployment',
    question:
      'A company runs a web application on AWS Elastic Beanstalk. For new releases, the application must keep full capacity during deployment, and if the new version fails health checks, the rollback must be fast and must not affect the instances that are currently serving traffic. Which deployment policy should the developer use?',
    options: [
      'Immutable',
      'All at once',
      'Rolling',
      'Rolling with additional batch',
    ],
    answer: [0],
    explanation:
      'An immutable deployment launches the new version on a fresh set of instances in a temporary Auto Scaling group, keeping existing instances untouched, so rollback only requires terminating the new instances. All at once causes downtime, and Rolling reduces capacity during deployment. Rolling with additional batch keeps capacity but updates existing instances in place, so a failure requires a new rolling redeploy.',
  },
  {
    id: 'dva-019',
    domain: 'Deployment',
    question:
      'A developer is writing an AWS CloudFormation template that uses AWS::Serverless::Function resources. What must the template include so that CloudFormation can process these AWS SAM resources?',
    options: [
      'A Mappings section that maps each function to a runtime',
      'A Transform section that specifies AWS::Serverless-2016-10-31',
      'A Conditions section that enables serverless resources',
      'A Metadata section that lists each function handler',
    ],
    answer: [1],
    explanation:
      'The Transform declaration AWS::Serverless-2016-10-31 tells CloudFormation to expand SAM resource types into standard CloudFormation resources during deployment. Mappings, Conditions, and Metadata are ordinary template sections and do not enable SAM syntax.',
  },
  {
    id: 'dva-020',
    domain: 'Deployment',
    question:
      'An Amazon API Gateway REST API has dev and prod stages. Both stages integrate with the same AWS Lambda function, which has dev and prod aliases. The developer wants each stage to invoke the matching alias without maintaining two separate API definitions. What should the developer do?',
    options: [
      'Create two separate REST APIs, one for each alias',
      'Enable stage-level caching on the prod stage only',
      'Define a stage variable in each stage and reference it in the Lambda integration ARN to select the alias',
      'Use a usage plan to route requests to the correct alias',
    ],
    answer: [2],
    explanation:
      'Stage variables are name-value pairs defined per stage and can be referenced in the integration, for example as the alias qualifier of the Lambda function ARN, so one API definition routes each stage to a different alias. The Lambda resource policy must allow API Gateway to invoke each alias. Separate APIs add duplication, caching does not change routing, and usage plans control throttling and quotas.',
  },
  {
    id: 'dva-021',
    domain: 'Deployment',
    question:
      'A networking CloudFormation stack creates a VPC and subnets. Several application stacks, deployed separately, must reference the subnet IDs created by the networking stack. Which combination of steps will accomplish this? (Choose TWO.)',
    options: [
      'Use nested stacks and hardcode the subnet IDs in each child template',
      'Store the subnet IDs in the Mappings section of each application template',
      'Add the subnet IDs to the Outputs section of the networking stack with an Export name',
      'Use the Ref intrinsic function in the application stacks with the logical ID of the subnet',
      'Use the Fn::ImportValue intrinsic function in the application stacks to reference the exported names',
    ],
    answer: [2, 4],
    explanation:
      'Cross-stack references work by exporting values from one stack in its Outputs section and importing them in other stacks with Fn::ImportValue. Ref only resolves logical IDs within the same template, and hardcoding IDs in templates or Mappings breaks when resources are recreated.',
  },

  // ---------------- Troubleshooting and Optimization ----------------
  {
    id: 'dva-022',
    domain: 'Troubleshooting and Optimization',
    question:
      'A developer has instrumented a serverless application with AWS X-Ray. The team wants to search and filter traces in the X-Ray console by customer ID and order type. How should the developer record these values in the trace segments?',
    options: [
      'As metadata on the segments',
      'As annotations on the segments',
      'As custom Amazon CloudWatch metrics',
      'As environment variables on the Lambda function',
    ],
    answer: [1],
    explanation:
      'X-Ray annotations are key-value pairs that are indexed, so they can be used in filter expressions to search traces. Metadata can hold any data but is not indexed and cannot be used for filtering. CloudWatch metrics and environment variables are not part of the trace data.',
  },
  {
    id: 'dva-023',
    domain: 'Troubleshooting and Optimization',
    question:
      'A payment-processing AWS Lambda function in an account occasionally fails with throttling errors during traffic spikes, while other, less important functions in the same account and Region are consuming most of the available concurrency. How can the developer ensure the payment function always has capacity available?',
    options: [
      'Increase the memory allocated to the payment function',
      'Increase the timeout of the payment function',
      'Move the payment code into a Lambda layer',
      'Configure reserved concurrency for the payment function',
    ],
    answer: [3],
    explanation:
      'Reserved concurrency sets aside part of the account concurrency for a specific function, so other functions cannot consume it, and it also caps that function at the reserved amount. Memory and timeout settings change per-invocation resources and duration, not concurrency allocation, and layers only package shared code.',
  },
  {
    id: 'dva-024',
    domain: 'Troubleshooting and Optimization',
    question:
      'An application writes its logs to an Amazon CloudWatch Logs log group. The operations team wants an alarm when the number of log lines that contain the word ERROR exceeds a threshold within five minutes. The solution should not require code changes. What should the developer do?',
    options: [
      'Create a metric filter on the log group that matches ERROR, then create a CloudWatch alarm on the resulting metric',
      'Enable detailed monitoring on the log group',
      'Export the log group to Amazon S3 every five minutes and count errors with a script',
      'Add PutMetricData calls to the application for every error',
    ],
    answer: [0],
    explanation:
      'A CloudWatch Logs metric filter turns matching log events into a CloudWatch metric, and an alarm can be set on that metric without changing application code. Detailed monitoring applies to EC2 metrics, not log groups. Exporting to S3 is slow and complex, and PutMetricData would require code changes.',
  },
  {
    id: 'dva-025',
    domain: 'Troubleshooting and Optimization',
    question:
      'An application writes sensor readings to an Amazon DynamoDB table that uses provisioned capacity. The partition key is the date of the reading, so all writes for a day go to the same key. The application receives ProvisionedThroughputExceededException errors even though the table total consumed capacity is well below its provisioned capacity. Which actions will help resolve the issue? (Choose TWO.)',
    options: [
      'Redesign the partition key to use a high-cardinality value, such as the sensor ID, so writes are spread evenly',
      'Switch all read operations to strongly consistent reads',
      'Retry throttled requests by using exponential backoff with jitter',
      'Add a local secondary index on the date attribute',
      'Enable DynamoDB Streams on the table',
    ],
    answer: [0, 2],
    explanation:
      'Writing to a single partition key value concentrates traffic on one partition and creates a hot partition, so a high-cardinality partition key spreads load across partitions, and exponential backoff with jitter handles any remaining throttling gracefully. Strongly consistent reads consume more read capacity, and an LSI or Streams does not reduce write concentration on the base table key.',
  },
];

export default questions;
