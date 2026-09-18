const questions = [
  // ---------------- Design Secure Architectures ----------------
  {
    id: 'saa-001',
    domain: 'Design Secure Architectures',
    question:
      'A media company serves images from a private Amazon S3 bucket through an Amazon CloudFront distribution. The security team requires that users must not be able to download objects directly from the S3 bucket URL; all access must go through CloudFront. Which solution meets these requirements?',
    options: [
      'Make the bucket public and add a bucket policy that only allows requests containing a specific Referer header set by CloudFront.',
      'Configure CloudFront origin access control (OAC) and update the bucket policy to allow s3:GetObject only for the CloudFront service principal with a condition on the distribution ARN.',
      'Enable S3 static website hosting and restrict the bucket policy to the published CloudFront IP address ranges.',
      'Generate S3 presigned URLs for every object and embed them in the CloudFront distribution configuration.',
    ],
    answer: [1],
    explanation:
      'Origin access control lets CloudFront sign requests to S3, and a bucket policy scoped to the CloudFront service principal and the specific distribution ARN keeps the bucket private while blocking direct access. A Referer header can be spoofed by anyone and requires a public bucket. IP range allowlists are fragile, and presigned URLs are for granting temporary direct S3 access, not for restricting access to CloudFront.',
  },
  {
    id: 'saa-002',
    domain: 'Design Secure Architectures',
    question:
      'An application runs on Amazon EC2 instances in private subnets. The instances must read and write objects in an Amazon S3 bucket in the same AWS Region. Company policy states that this traffic must not traverse the internet, and there is no NAT gateway in the VPC. Which solution meets these requirements with the LEAST cost?',
    options: [
      'Create a NAT gateway in a public subnet and route S3 traffic through it.',
      'Attach an internet gateway to the VPC and assign public IP addresses to the instances.',
      'Set up an AWS Site-to-Site VPN connection and route S3 traffic through the VPN.',
      'Create an S3 gateway VPC endpoint and add it to the route tables associated with the private subnets.',
    ],
    answer: [3],
    explanation:
      'A gateway VPC endpoint for S3 keeps traffic on the AWS network, is added as a route in the subnet route tables, and has no additional charge. A NAT gateway or internet gateway sends traffic toward public S3 endpoints over the internet path and adds cost or exposure. A Site-to-Site VPN connects to on-premises networks and does not solve private access to S3 from the VPC.',
  },
  {
    id: 'saa-003',
    domain: 'Design Secure Architectures',
    question:
      'A company uses AWS Organizations to manage dozens of member accounts. The security team must ensure that no user or role in any member account, including account administrators, can stop or delete AWS CloudTrail trails. Which solution meets these requirements with the LEAST operational overhead?',
    options: [
      'Attach a service control policy (SCP) to the organization root or relevant OUs that denies cloudtrail:StopLogging and cloudtrail:DeleteTrail.',
      'Create an IAM policy that denies the CloudTrail actions and attach it to every IAM user and role in each member account.',
      'Configure an Amazon EventBridge rule that detects StopLogging calls and invokes an AWS Lambda function to restart logging.',
      'Enable AWS Config in every account with a rule that checks whether CloudTrail is enabled.',
    ],
    answer: [0],
    explanation:
      'SCPs set the maximum available permissions for member accounts, so an explicit deny applies to every principal in those accounts, including administrators, and is managed centrally. Attaching IAM policies everywhere is error-prone and an administrator could simply detach them. EventBridge remediation and AWS Config rules only detect or react after the change has already happened instead of preventing it.',
  },
  {
    id: 'saa-004',
    domain: 'Design Secure Architectures',
    question:
      'A developer has stored an IAM user access key and secret key in a configuration file on Amazon EC2 instances so that an application can write items to an Amazon DynamoDB table. A security review flags this as a risk. What is the MOST secure way for the application to access DynamoDB?',
    options: [
      'Encrypt the configuration file with an AWS KMS key and decrypt it when the application starts.',
      'Store the access keys as environment variables in the EC2 user data script.',
      'Create an IAM role with the required DynamoDB permissions and attach it to the instances through an instance profile.',
      'Rotate the IAM user access keys every week by using a scheduled script.',
    ],
    answer: [2],
    explanation:
      'An IAM role attached through an instance profile provides temporary credentials that are rotated automatically and delivered through the instance metadata service, so no long-term keys are stored on the instance. Encrypting or rotating the keys still relies on long-term credentials that can leak. User data is readable from the instance and is not a secure place for secrets.',
  },
  {
    id: 'saa-005',
    domain: 'Design Secure Architectures',
    question:
      'A financial services company stores sensitive reports in Amazon S3. Compliance requires that the data be encrypted at rest, that the company control who can use the encryption key through a key policy, and that every use of the key be logged for auditing. Which solution meets these requirements?',
    options: [
      'Use server-side encryption with Amazon S3 managed keys (SSE-S3).',
      'Use server-side encryption with an AWS KMS customer managed key (SSE-KMS).',
      'Use client-side encryption with a key stored in a file on the application servers.',
      'Enable S3 Object Lock in compliance mode on the bucket.',
    ],
    answer: [1],
    explanation:
      'SSE-KMS with a customer managed key lets the company define a key policy controlling who can use the key, and each KMS API call made on the key is recorded in AWS CloudTrail. SSE-S3 encrypts data but the keys are fully managed by S3, with no customer key policy or per-use audit trail. Object Lock provides write-once-read-many retention, not encryption, and a key file on servers offers no central access control or auditing.',
  },
  {
    id: 'saa-006',
    domain: 'Design Secure Architectures',
    question:
      'A company runs an application on Amazon EC2 that connects to an Amazon RDS for PostgreSQL database. The database password is currently hardcoded in the application. The company wants to remove the hardcoded password and have the password rotated automatically on a schedule. Which solution meets these requirements with the LEAST operational overhead?',
    options: [
      'Store the password as a plaintext parameter in AWS Systems Manager Parameter Store and write a cron job on the EC2 instances to change it.',
      'Store the password in an encrypted Amazon S3 object and have an AWS Lambda function update it monthly.',
      'Store the password in an Amazon DynamoDB table encrypted with AWS KMS and rotate it manually.',
      'Store the credentials in AWS Secrets Manager, enable automatic rotation for the RDS secret, and have the application retrieve the secret at runtime.',
    ],
    answer: [3],
    explanation:
      'AWS Secrets Manager natively supports automatic rotation for Amazon RDS database credentials and lets applications retrieve the current secret at runtime through an API call authorized by IAM. The other options require building and maintaining custom rotation logic or manual processes. Storing a password as a plaintext parameter also fails basic security expectations.',
  },
  {
    id: 'saa-007',
    domain: 'Design Secure Architectures',
    question:
      'A company is deploying a three-tier web application in a VPC. The web tier runs behind an Application Load Balancer, the application tier runs on EC2 instances, and the data tier is an Amazon RDS for MySQL DB instance. The database must be reachable only by the application tier and must not be reachable from the internet. Which actions should a solutions architect take? (Choose TWO.)',
    options: [
      'Assign an Elastic IP address to the DB instance so that the application tier can reach it at a fixed address.',
      'Configure the DB security group to allow inbound MySQL traffic only from the security group attached to the application tier instances.',
      'Add a network ACL rule to the database subnets that allows inbound MySQL traffic from 0.0.0.0/0.',
      'Launch the DB instance in private subnets whose route tables have no route to an internet gateway, and disable public accessibility.',
      'Place the DB instance in a public subnet and rely on the security group to restrict access.',
    ],
    answer: [1, 3],
    explanation:
      'Referencing the application tier security group as the source allows only those instances to connect, and placing the database in private subnets with public accessibility disabled keeps it off the internet. An Elastic IP or a public subnet exposes the database to the internet unnecessarily. A network ACL rule allowing 0.0.0.0/0 broadens access instead of restricting it.',
  },
  {
    id: 'saa-008',
    domain: 'Design Secure Architectures',
    question:
      'A company has two AWS accounts: Development and Production. Developers authenticate as IAM users in the Development account. Some developers occasionally need read-only access to an S3 bucket in the Production account. The company does not want to create IAM users in the Production account. Which solution meets these requirements?',
    options: [
      'Share the root user credentials of the Production account with the developers.',
      'Create an IAM role in the Production account with read-only S3 permissions and a trust policy that trusts the Development account, then allow the developers to call sts:AssumeRole on that role.',
      'Copy the bucket contents to the Development account every night by using S3 Cross-Region Replication.',
      'Create an access key for a Production account IAM user and store it in the Development account.',
    ],
    answer: [1],
    explanation:
      'A cross-account IAM role with a trust policy for the Development account lets authorized developers assume the role and receive temporary credentials with only the permissions they need. Sharing root credentials or long-term access keys violates least privilege and security best practices. Replicating the data creates unnecessary copies and does not provide controlled access to the Production bucket itself.',
  },

  // ---------------- Design Resilient Architectures ----------------
  {
    id: 'saa-009',
    domain: 'Design Resilient Architectures',
    question:
      'A company runs its order database on a single Amazon RDS for MySQL DB instance. The company needs the database to remain available with automatic failover if the Availability Zone that hosts the DB instance becomes unavailable. Application changes must be kept to a minimum. Which solution meets these requirements?',
    options: [
      'Create a read replica in another Availability Zone and point the application to both endpoints.',
      'Take automated snapshots every hour and restore the latest snapshot in another Availability Zone during an outage.',
      'Convert the DB instance to a Multi-AZ deployment.',
      'Migrate the database to MySQL running on an EC2 instance in an Auto Scaling group.',
    ],
    answer: [2],
    explanation:
      'An RDS Multi-AZ deployment maintains a synchronous standby in another Availability Zone and automatically fails over by updating the DNS record of the same endpoint, so the application does not need to change. A read replica uses asynchronous replication and must be promoted manually, and restoring snapshots is slow and loses recent data. Self-managing MySQL on EC2 adds operational overhead and does not provide built-in failover.',
  },
  {
    id: 'saa-010',
    domain: 'Design Resilient Architectures',
    question:
      'An e-commerce company has a web tier that sends orders directly to a processing tier by synchronous API calls. During flash sales, the processing tier becomes overwhelmed and orders are lost. The company wants to make sure that no orders are lost and that the processing tier can scale with demand. Which solution meets these requirements?',
    options: [
      'Place an Amazon SQS queue between the tiers, have the processing instances poll the queue, and scale the processing Auto Scaling group based on the number of messages in the queue.',
      'Increase the instance size of the processing tier so that it can handle peak load.',
      'Place a Network Load Balancer in front of the processing tier to distribute requests.',
      'Publish orders to an Amazon SNS topic with an HTTP endpoint subscription to the processing tier.',
    ],
    answer: [0],
    explanation:
      'An SQS queue durably buffers orders so that they are not lost when consumers are busy, and scaling consumers on queue depth matches capacity to demand. A larger instance only raises the ceiling and still fails beyond it. A load balancer or SNS push delivery still sends requests directly to consumers that may be overloaded, without a durable buffer that consumers pull from at their own pace.',
  },
  {
    id: 'saa-011',
    domain: 'Design Resilient Architectures',
    question:
      'A company hosts a web application in the us-east-1 Region and has a scaled-down copy of the environment in us-west-2 for disaster recovery. The company wants DNS to route all users to us-east-1 normally and to automatically send users to us-west-2 only if the primary environment becomes unhealthy. Which Amazon Route 53 configuration meets these requirements?',
    options: [
      'Weighted routing with a weight of 50 for each Region.',
      'Latency-based routing with records in both Regions.',
      'Geolocation routing based on the continent of the user.',
      'Failover routing with a primary record for us-east-1 associated with a health check and a secondary record for us-west-2.',
    ],
    answer: [3],
    explanation:
      'Failover routing is designed for active-passive setups: Route 53 returns the primary record while its health check is healthy and returns the secondary record when it is not. Weighted and latency-based routing send traffic to both Regions during normal operation. Geolocation routing directs users by location and does not implement active-passive failover by itself.',
  },
  {
    id: 'saa-012',
    domain: 'Design Resilient Architectures',
    question:
      'A company runs a stateless web application on a single large Amazon EC2 instance in one Availability Zone. The company wants the application to tolerate the failure of an instance or an entire Availability Zone without manual intervention. Which combination of actions will meet these requirements? (Choose TWO.)',
    options: [
      'Launch the instances in a cluster placement group.',
      'Create an Auto Scaling group that launches instances across at least two Availability Zones.',
      'Write a script that moves an Elastic IP address to a standby instance when the primary fails.',
      'Replace the instance with a larger instance type that has more vCPUs.',
      'Place an Application Load Balancer with health checks in front of the instances, with the load balancer enabled in the same Availability Zones.',
    ],
    answer: [1, 4],
    explanation:
      'An Auto Scaling group spanning multiple Availability Zones replaces unhealthy instances automatically, and an Application Load Balancer routes traffic only to healthy targets across those zones. A cluster placement group packs instances close together in a single Availability Zone, which reduces resilience. A custom Elastic IP script adds operational overhead, and a larger instance is still a single point of failure.',
  },
  {
    id: 'saa-013',
    domain: 'Design Resilient Architectures',
    question:
      'When a customer places an order, a company needs to notify three independent systems: billing, shipping, and analytics. Each system must receive every order event, process it at its own pace, and not lose events if it is temporarily unavailable. Which architecture meets these requirements?',
    options: [
      'Send each order to a single Amazon SQS queue that all three systems poll.',
      'Publish each order to an Amazon SNS topic, and subscribe a separate Amazon SQS queue for each system to the topic.',
      'Write each order to an Amazon S3 bucket and have each system list the bucket every minute.',
      'Have the order service call each system synchronously through an Application Load Balancer.',
    ],
    answer: [1],
    explanation:
      'The SNS-to-SQS fan-out pattern delivers a copy of each message to every subscribed queue, and each queue durably holds messages until its consumer processes them. With a single shared SQS queue, each message is consumed by only one system. Polling S3 is inefficient and error-prone, and synchronous calls tightly couple the systems so that one outage affects order processing.',
  },
  {
    id: 'saa-014',
    domain: 'Design Resilient Architectures',
    question:
      'A company runs a content management application on Linux EC2 instances in an Auto Scaling group across three Availability Zones. All instances need concurrent read and write access to the same set of files, and the storage must remain available if one Availability Zone fails. Which storage solution meets these requirements?',
    options: [
      'An Amazon Elastic File System (Amazon EFS) Regional file system mounted on every instance.',
      'An Amazon EBS General Purpose SSD volume attached to each instance and synchronized with rsync.',
      'Amazon FSx for Windows File Server deployed in a single Availability Zone.',
      'Instance store volumes on each instance.',
    ],
    answer: [0],
    explanation:
      'Amazon EFS provides a shared NFS file system that many Linux instances across multiple Availability Zones can mount at the same time, and a Regional file system stores data redundantly across multiple Availability Zones. EBS volumes are tied to one Availability Zone, and syncing them with scripts is fragile. A single-AZ FSx for Windows File Server deployment does not survive an AZ failure and targets SMB workloads, and instance store is ephemeral.',
  },
  {
    id: 'saa-015',
    domain: 'Design Resilient Architectures',
    question:
      'A global company uses Amazon Aurora MySQL as the database for a critical application in one AWS Region. The company needs a disaster recovery strategy for a full Regional outage with a recovery point objective (RPO) measured in seconds and a recovery time objective (RTO) measured in minutes. Which solution meets these requirements?',
    options: [
      'Copy automated Aurora snapshots to another Region every day.',
      'Add Aurora Replicas in additional Availability Zones within the same Region.',
      'Export the database to Amazon S3 each hour and enable S3 Cross-Region Replication.',
      'Use Amazon Aurora Global Database with a secondary cluster in another Region, and promote the secondary cluster during a disaster.',
    ],
    answer: [3],
    explanation:
      'Aurora Global Database uses storage-based replication to secondary Regions with typically very low lag, and a secondary cluster can be promoted quickly, meeting an RPO of seconds and an RTO of minutes. Daily snapshot copies or hourly exports would lose hours of data and take longer to restore. Aurora Replicas in the same Region do not protect against a Regional outage.',
  },

  // ---------------- Design High-Performing Architectures ----------------
  {
    id: 'saa-016',
    domain: 'Design High-Performing Architectures',
    question:
      'A company runs an Amazon RDS for PostgreSQL database that supports an online transaction processing (OLTP) application. Business analysts run heavy reporting queries against the same database during business hours, which slows down the application. Which solution will improve application performance with the LEAST changes?',
    options: [
      'Enable Multi-AZ and direct the reporting queries to the standby instance.',
      'Create an RDS read replica and direct the reporting queries to the read replica endpoint.',
      'Move the reporting queries to an AWS Lambda function.',
      'Increase the allocated storage of the DB instance.',
    ],
    answer: [1],
    explanation:
      'A read replica offloads read-only workloads such as reporting from the primary instance, freeing capacity for transactional traffic. In a classic RDS Multi-AZ instance deployment, the standby does not serve read traffic and exists only for failover. Running the queries from Lambda still hits the same database, and adding storage does not address CPU and I/O contention caused by the queries.',
  },
  {
    id: 'saa-017',
    domain: 'Design High-Performing Architectures',
    question:
      'A gaming company runs a multiplayer game server that uses UDP on Amazon EC2 instances behind Network Load Balancers in two AWS Regions. Players worldwide experience inconsistent latency, and the company wants to give players a fixed set of static IP addresses and fast failover between Regions. Which solution meets these requirements?',
    options: [
      'Place an Amazon CloudFront distribution in front of the Network Load Balancers.',
      'Use Amazon Route 53 latency-based routing with health checks.',
      'Create an AWS Global Accelerator accelerator with endpoint groups for the Network Load Balancers in both Regions.',
      'Use Amazon API Gateway edge-optimized endpoints in both Regions.',
    ],
    answer: [2],
    explanation:
      'AWS Global Accelerator provides static anycast IP addresses, routes TCP and UDP traffic over the AWS global network from the nearest edge location, and fails over between endpoint groups quickly based on health checks. CloudFront and API Gateway are designed for HTTP(S) traffic, not arbitrary UDP game traffic. Route 53 routing depends on DNS caching and TTLs, so failover is slower and it does not provide static IP addresses.',
  },
  {
    id: 'saa-018',
    domain: 'Design High-Performing Architectures',
    question:
      'A retail application stores its product catalog in an Amazon DynamoDB table. During sales events, the table receives a very high volume of repeated reads for the same popular items, and the application requires microsecond read latency. Which solution meets these requirements with the LEAST application changes?',
    options: [
      'Enable DynamoDB Streams and cache items in an AWS Lambda function.',
      'Add a global secondary index on the product ID attribute.',
      'Place an Amazon ElastiCache for Redis cluster in front of the table and write custom cache logic.',
      'Deploy DynamoDB Accelerator (DAX) and point the application SDK client to the DAX cluster.',
    ],
    answer: [3],
    explanation:
      'DAX is an in-memory cache built for DynamoDB that is API-compatible with DynamoDB, so the application only needs to use the DAX client, and it delivers microsecond read latency for cached items. ElastiCache can also cache data but requires custom caching logic in the application. A global secondary index does not reduce latency for hot items, and DynamoDB Streams captures item changes rather than serving reads.',
  },
  {
    id: 'saa-019',
    domain: 'Design High-Performing Architectures',
    question:
      'A company collects large video files, often several gigabytes each, from users around the world and uploads them to an Amazon S3 bucket in a single Region. Users far from the Region report slow and frequently failing uploads. Which actions will improve upload performance and reliability? (Choose TWO.)',
    options: [
      'Enable S3 Transfer Acceleration on the bucket and use the accelerate endpoint for uploads.',
      'Enable S3 Versioning on the bucket.',
      'Use multipart upload so that parts are uploaded in parallel and failed parts can be retried individually.',
      'Change the storage class of the uploaded objects to S3 Standard-Infrequent Access.',
      'Enable S3 server access logging on the bucket.',
    ],
    answer: [0, 2],
    explanation:
      'S3 Transfer Acceleration routes uploads through CloudFront edge locations and over the AWS backbone, which speeds up long-distance transfers. Multipart upload splits large files into parts that can be uploaded in parallel, and only failed parts need to be retried. Versioning, storage class changes, and access logging do not affect upload speed or reliability.',
  },
  {
    id: 'saa-020',
    domain: 'Design High-Performing Architectures',
    question:
      'A research institute runs a high performance computing (HPC) workload on hundreds of Linux EC2 instances. The job needs a shared file system that provides sub-millisecond latency and very high throughput. The input datasets are stored in Amazon S3, and results must be written back to S3. Which storage solution meets these requirements?',
    options: [
      'Amazon FSx for Lustre linked to the S3 bucket.',
      'Amazon S3 mounted on each instance through a custom FUSE script.',
      'Amazon FSx for Windows File Server.',
      'AWS Storage Gateway Volume Gateway in cached mode.',
    ],
    answer: [0],
    explanation:
      'Amazon FSx for Lustre is a high-performance parallel file system for HPC workloads and can be linked to an S3 bucket to lazy-load input data and export results back to S3. FSx for Windows File Server targets SMB and Windows workloads rather than Linux HPC. Custom FUSE mounts do not deliver file system level performance, and Volume Gateway provides iSCSI block storage for on-premises hosts.',
  },
  {
    id: 'saa-021',
    domain: 'Design High-Performing Architectures',
    question:
      'A company is migrating a latency-sensitive, I/O-intensive relational database to a self-managed installation on Amazon EC2. The database requires consistent, sustained high IOPS with low latency for its data volume. Which Amazon EBS volume type is MOST appropriate?',
    options: [
      'Throughput Optimized HDD (st1)',
      'Cold HDD (sc1)',
      'Provisioned IOPS SSD (io2)',
      'Magnetic (standard)',
    ],
    answer: [2],
    explanation:
      'Provisioned IOPS SSD volumes such as io2 are designed for I/O-intensive databases that need consistent, sustained IOPS and low latency, and let you specify the IOPS you need. The st1 and sc1 HDD types are optimized for large sequential throughput or infrequent access, not random database I/O. Magnetic volumes are a previous-generation type with low performance.',
  },

  // ---------------- Design Cost-Optimized Architectures ----------------
  {
    id: 'saa-022',
    domain: 'Design Cost-Optimized Architectures',
    question:
      'A company runs nightly image-processing batch jobs on Amazon EC2. The jobs are stateless, checkpoint their progress to Amazon S3, and can be restarted at any time without affecting the business. The company wants to reduce compute costs as much as possible. Which purchasing option should a solutions architect recommend?',
    options: [
      'On-Demand Instances',
      'Dedicated Hosts',
      'Standard Reserved Instances with a 3-year term',
      'Spot Instances',
    ],
    answer: [3],
    explanation:
      'Spot Instances offer the largest discounts compared to On-Demand pricing and are well suited to fault-tolerant, interruptible workloads such as checkpointed batch jobs. On-Demand Instances cost more for the same work. Dedicated Hosts are for licensing or compliance needs, and a Reserved Instance commitment fits steady 24/7 usage rather than a nightly batch window.',
  },
  {
    id: 'saa-023',
    domain: 'Design Cost-Optimized Architectures',
    question:
      'A company stores millions of objects in Amazon S3 Standard. Some objects are accessed frequently, while others are not accessed for months, and the access patterns are unpredictable and change over time. The company wants to reduce storage costs automatically without affecting retrieval performance or adding operational overhead. Which solution meets these requirements?',
    options: [
      'Create a lifecycle rule to move all objects to S3 Glacier Flexible Retrieval after 30 days.',
      'Move the objects to S3 Intelligent-Tiering.',
      'Move the objects to S3 One Zone-Infrequent Access.',
      'Write a script that analyzes S3 server access logs and moves objects between storage classes weekly.',
    ],
    answer: [1],
    explanation:
      'S3 Intelligent-Tiering automatically moves objects between access tiers based on observed access patterns, with no retrieval fees and no impact on performance for the frequent and infrequent access tiers, which makes it ideal for unknown or changing access patterns. Archiving everything to Glacier Flexible Retrieval would make frequently accessed objects slow and costly to retrieve. One Zone-IA reduces resilience and charges retrieval fees, and a custom script adds operational overhead.',
  },
  {
    id: 'saa-024',
    domain: 'Design Cost-Optimized Architectures',
    question:
      'A company has a steady, predictable baseline of compute usage spread across Amazon EC2 instances of several instance families, AWS Fargate tasks, and AWS Lambda functions. The company expects to change instance families and move some workloads to another Region during the next year. Which option provides the greatest savings while keeping this flexibility?',
    options: [
      'Purchase Compute Savings Plans for the baseline usage.',
      'Purchase Standard Reserved Instances for the current instance types.',
      'Purchase EC2 Instance Savings Plans for the current instance family.',
      'Run all workloads on Spot Instances.',
    ],
    answer: [0],
    explanation:
      'Compute Savings Plans apply automatically to EC2 usage regardless of instance family, size, operating system, or Region, and also cover Fargate and Lambda usage. Standard Reserved Instances and EC2 Instance Savings Plans are tied to a specific instance family and Region, so they would not follow the planned changes. Spot Instances can be interrupted and are not suitable for a steady baseline that must always run.',
  },
  {
    id: 'saa-025',
    domain: 'Design Cost-Optimized Architectures',
    question:
      'A company stores application log files in Amazon S3. The logs are analyzed frequently during the first 30 days after creation and are almost never accessed afterward. Regulations require the logs to be kept for 7 years, and retrieval within 48 hours is acceptable for older logs. Which solution is the MOST cost-effective?',
    options: [
      'Keep all logs in S3 Standard for 7 years.',
      'Store the logs in S3 Standard-Infrequent Access from the start and delete them after 7 years.',
      'Create an S3 Lifecycle rule that transitions logs to S3 Glacier Deep Archive after 30 days and expires them after 7 years.',
      'Copy the logs to Amazon EBS Cold HDD (sc1) volumes after 30 days.',
    ],
    answer: [2],
    explanation:
      'S3 Glacier Deep Archive is the lowest-cost S3 storage class for long-term retention of rarely accessed data, and its standard retrievals complete well within 48 hours; a lifecycle rule automates both the transition and the expiration. Keeping logs in S3 Standard or Standard-IA for years costs far more, and Standard-IA adds retrieval fees during the busy first 30 days. EBS volumes are more expensive than S3 archive storage and add management overhead.',
  },
];

export default questions;
