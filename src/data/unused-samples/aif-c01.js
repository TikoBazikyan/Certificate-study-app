const questions = [
  // ---------------- Fundamentals of AI and ML ----------------
  {
    id: 'aif-001',
    domain: 'Fundamentals of AI and ML',
    question:
      'A payments company has several years of historical card transactions. Each transaction is already tagged as either "fraudulent" or "legitimate". The company wants to build a model that flags new transactions as likely fraud. Which machine learning approach fits this requirement?',
    options: [
      'Unsupervised learning using clustering',
      'Supervised learning using binary classification',
      'Reinforcement learning using a reward function',
      'Dimensionality reduction using principal component analysis (PCA)',
    ],
    answer: [1],
    explanation:
      'Because the historical data has known labels (fraudulent or legitimate) and the goal is to predict one of two classes, this is a supervised binary classification problem. Clustering and PCA are unsupervised techniques that do not learn from labels, and reinforcement learning is for an agent learning actions through trial-and-error rewards.',
  },
  {
    id: 'aif-002',
    domain: 'Fundamentals of AI and ML',
    question:
      'A retail company wants to group its customers into segments based on purchase history and browsing behavior. The company does not have any predefined segment labels and wants the data to reveal natural groupings. Which technique should the company use?',
    options: [
      'Linear regression',
      'Logistic regression',
      'Supervised image classification',
      'Clustering, such as k-means',
    ],
    answer: [3],
    explanation:
      'Clustering is an unsupervised learning technique that finds natural groupings in unlabeled data, which is exactly what customer segmentation without predefined labels requires. Linear and logistic regression and image classification are supervised methods that need a known target value or label for training.',
  },
  {
    id: 'aif-003',
    domain: 'Fundamentals of AI and ML',
    question:
      'A data scientist trains a model that reaches 99% accuracy on the training dataset but only 70% accuracy on a separate validation dataset. What is the MOST likely explanation?',
    options: [
      'The model is overfitting the training data.',
      'The model is underfitting the training data.',
      'The validation dataset is too large.',
      'The learning rate is too low for the model to converge.',
    ],
    answer: [0],
    explanation:
      'A large gap between very high training performance and much lower validation performance means the model memorized the training data, including its noise, and does not generalize. That is overfitting. Underfitting would show poor performance on both the training and validation data.',
  },
  {
    id: 'aif-004',
    domain: 'Fundamentals of AI and ML',
    question:
      'A team has built a binary classification model that predicts whether a loan applicant will default. Which metrics are appropriate for evaluating this model? (Choose TWO.)',
    options: [
      'F1 score',
      'Root mean squared error (RMSE)',
      'Mean absolute error (MAE)',
      'Area under the ROC curve (AUC)',
      'R-squared',
    ],
    answer: [0, 3],
    explanation:
      'F1 score (which balances precision and recall) and AUC (how well the model separates the two classes) are standard classification metrics. RMSE, MAE and R-squared measure how far off numeric predictions are, so they are used for regression models, not classification.',
  },
  {
    id: 'aif-005',
    domain: 'Fundamentals of AI and ML',
    question:
      'An insurance company receives thousands of scanned claim forms every day. It wants to automatically pull out printed and handwritten text, key-value pairs from form fields, and data in tables, without building or training its own ML model. Which AWS service should it use?',
    options: [
      'Amazon Comprehend',
      'Amazon Rekognition',
      'Amazon Textract',
      'Amazon Transcribe',
    ],
    answer: [2],
    explanation:
      'Amazon Textract is a managed service that extracts text, handwriting, form key-value pairs and tables from scanned documents. Amazon Comprehend analyzes text that has already been extracted (for example, sentiment or entities), Rekognition analyzes images and video for objects and faces, and Transcribe converts speech to text.',
  },

  // ---------------- Fundamentals of Generative AI ----------------
  {
    id: 'aif-006',
    domain: 'Fundamentals of Generative AI',
    question:
      'A company uses a large language model to create answers for a compliance FAQ. Reviewers complain that the same question produces noticeably different wording and content each time. The company wants the output to be more consistent and predictable. Which inference parameter change should it make?',
    options: [
      'Increase the temperature.',
      'Increase the maximum output length.',
      'Decrease the temperature.',
      'Add more stop sequences.',
    ],
    answer: [2],
    explanation:
      'Temperature controls how random the model is when choosing the next token. A lower temperature makes the model favor the most likely tokens, so responses become more deterministic and consistent. Raising the temperature adds variety, and changing the maximum length or stop sequences only affects where the output ends, not how random it is.',
  },
  {
    id: 'aif-007',
    domain: 'Fundamentals of Generative AI',
    question:
      'In the context of generative AI and semantic search, what are embeddings?',
    options: [
      'Numerical vector representations of data, such as text, that capture semantic meaning so similar items are close together in vector space',
      'Encrypted copies of training data stored inside the model weights',
      'Hand-written rules that tell a model how to format its output',
      'Metadata tags that a user attaches to documents to control access',
    ],
    answer: [0],
    explanation:
      'Embeddings are dense numeric vectors produced by a model. Their purpose is that content with similar meaning ends up close together, which is what lets vector databases and RAG do semantic similarity search. They are not encryption, formatting rules, or access-control metadata.',
  },
  {
    id: 'aif-008',
    domain: 'Fundamentals of Generative AI',
    question:
      'A developer notices that the cost of using a text generation model on Amazon Bedrock is based on the number of input and output tokens. What is a token?',
    options: [
      'A security credential used to authenticate API requests',
      'One complete sentence of input text',
      'A single model parameter (weight) that is updated during training',
      'A unit of text, such as a word, part of a word, or punctuation mark, that the model processes',
    ],
    answer: [3],
    explanation:
      'LLMs split text into tokens, which can be whole words, pieces of words or punctuation, and they read and generate text one token at a time. That is why usage and context size are measured in tokens. A token here is not an authentication credential, not a whole sentence, and not a model weight.',
  },
  {
    id: 'aif-009',
    domain: 'Fundamentals of Generative AI',
    question:
      'A chatbot built on a foundation model confidently tells a customer about a refund policy that the company has never offered. Which term describes this behavior?',
    options: [
      'Data drift',
      'Hallucination',
      'Overfitting',
      'Prompt injection',
    ],
    answer: [1],
    explanation:
      'A hallucination is when a generative model produces output that sounds fluent and confident but is false or unsupported. Data drift means the input data in production changes over time, overfitting is a training-time generalization problem, and prompt injection is a deliberate attack that uses crafted input to change the model\'s behavior.',
  },
  {
    id: 'aif-010',
    domain: 'Fundamentals of Generative AI',
    question:
      'Which statements correctly describe foundation models? (Choose TWO.)',
    options: [
      'They always return identical output for identical input, regardless of inference settings.',
      'They are pre-trained on very large and broad datasets.',
      'They require a separate labeled dataset before they can perform any task.',
      'They can perform only the single task they were originally trained for.',
      'They can be adapted to many downstream tasks through prompting or fine-tuning.',
    ],
    answer: [1, 4],
    explanation:
      'Foundation models are pre-trained on huge, broad datasets (mostly through self-supervised learning) and are general-purpose, so they can be adapted to many tasks using prompts, RAG or fine-tuning. Their output can vary depending on sampling settings such as temperature, they can often do tasks with no labeled data (zero-shot), and they are not limited to one task.',
  },
  {
    id: 'aif-011',
    domain: 'Fundamentals of Generative AI',
    question:
      'Which neural network architecture, based on a self-attention mechanism, underlies most modern large language models?',
    options: [
      'Convolutional neural network (CNN)',
      'Decision tree ensemble',
      'k-nearest neighbors (k-NN)',
      'Transformer',
    ],
    answer: [3],
    explanation:
      'The transformer architecture uses self-attention to weigh how relevant every token is to every other token in a sequence, and it is the basis of most modern LLMs. CNNs are mainly used for grid-like data such as images, while decision tree ensembles and k-NN are classic ML algorithms, not the architecture behind LLMs.',
  },

  // ---------------- Applications of Foundation Models ----------------
  {
    id: 'aif-012',
    domain: 'Applications of Foundation Models',
    question:
      'A company wants an internal assistant that answers employee questions using the latest HR policy documents stored in Amazon S3. The documents change every week, and the company does not want to retrain or fine-tune a model every time they change. Which solution meets these requirements with the LEAST operational effort?',
    options: [
      'Continue pre-training a foundation model on the policy documents every week.',
      'Use Amazon Bedrock Knowledge Bases to implement Retrieval Augmented Generation (RAG) over the S3 documents.',
      'Train a custom text classification model in Amazon SageMaker.',
      'Paste every policy document into the system prompt of every request.',
    ],
    answer: [1],
    explanation:
      'Amazon Bedrock Knowledge Bases is a managed RAG feature. It ingests the S3 documents, stores them as embeddings in a vector store and retrieves the relevant passages at query time, so answers stay current when the data is re-synced, with no retraining. Retraining every week is expensive and slow, a classifier cannot generate answers, and putting every document into every prompt is costly and limited by the model\'s context window.',
  },
  {
    id: 'aif-013',
    domain: 'Applications of Foundation Models',
    question:
      'A developer wants an LLM to classify support tickets into categories using a specific output format. Without changing the model, the developer adds three example tickets with their correct categories to the prompt before the new ticket. Which prompt engineering technique is this?',
    options: [
      'Few-shot prompting',
      'Zero-shot prompting',
      'Fine-tuning',
      'Continued pre-training',
    ],
    answer: [0],
    explanation:
      'Putting a small number of worked input-output examples in the prompt is called few-shot prompting, and it helps the model follow the expected pattern and format. Zero-shot prompting gives no examples. Fine-tuning and continued pre-training change the model weights through training, not through the prompt.',
  },
  {
    id: 'aif-014',
    domain: 'Applications of Foundation Models',
    question:
      'A legal-tech company has a large collection of unlabeled legal contracts and court filings. It wants a foundation model on Amazon Bedrock to better understand legal terminology and domain language in general, before any task-specific work. Which customization approach is MOST appropriate?',
    options: [
      'Fine-tuning with labeled prompt-completion pairs',
      'Few-shot prompting',
      'Continued pre-training on the unlabeled domain corpus',
      'Increasing the model temperature',
    ],
    answer: [2],
    explanation:
      'Continued pre-training uses large amounts of unlabeled, domain-specific text to extend the model\'s general knowledge of that domain. Fine-tuning needs labeled prompt-completion examples and targets a specific task. Few-shot prompting and temperature do not change what the model knows.',
  },
  {
    id: 'aif-015',
    domain: 'Applications of Foundation Models',
    question:
      'A customer-service chatbot built on Amazon Bedrock sometimes makes up answers about the company\'s internal return policies. Which actions will MOST directly reduce these inaccurate answers? (Choose TWO.)',
    options: [
      'Ground the model with Retrieval Augmented Generation (RAG) over the official policy documents.',
      'Increase the temperature so the model explores more possible answers.',
      'Increase the maximum number of output tokens.',
      'Instruct the model in the prompt to answer only from the provided context and to say it does not know when the answer is not there.',
      'Remove the system prompt so the model is less constrained.',
    ],
    answer: [0, 3],
    explanation:
      'RAG gives the model the real policy text to base its answer on, and telling it to answer only from that context (and to admit when it does not know) discourages invented answers. Raising temperature makes output more random, a longer output limit does nothing for accuracy, and removing the system prompt takes away useful guidance.',
  },
  {
    id: 'aif-016',
    domain: 'Applications of Foundation Models',
    question:
      'A travel company wants a generative AI assistant that can understand a customer request, break it into steps, call the company\'s booking APIs to check availability and make reservations, and then confirm the result to the customer. Which Amazon Bedrock capability is designed for this?',
    options: [
      'Amazon Bedrock Guardrails',
      'Amazon Bedrock model evaluation',
      'Amazon Bedrock provisioned throughput',
      'Amazon Bedrock Agents',
    ],
    answer: [3],
    explanation:
      'Amazon Bedrock Agents use a foundation model to plan multi-step tasks and call actions such as company APIs (through action groups), and they can also query knowledge bases. Guardrails filter content, model evaluation compares model quality, and provisioned throughput reserves inference capacity. None of those three orchestrate API calls.',
  },
  {
    id: 'aif-017',
    domain: 'Applications of Foundation Models',
    question:
      'A team is comparing two foundation models for automatically summarizing long news articles. They have human-written reference summaries and want an automatic metric that measures how much of the reference content the generated summaries capture. Which metric is MOST commonly used for this?',
    options: [
      'BLEU',
      'ROUGE',
      'Mean squared error (MSE)',
      'Precision-recall AUC',
    ],
    answer: [1],
    explanation:
      'ROUGE (Recall-Oriented Understudy for Gisting Evaluation) measures how much generated text overlaps with reference summaries, and it is the standard automatic metric for summarization. BLEU is mainly used for machine translation, MSE is a regression metric, and precision-recall AUC is for classifiers.',
  },
  {
    id: 'aif-018',
    domain: 'Applications of Foundation Models',
    question:
      'A developer finds that an LLM often gets multi-step math word problems wrong. The developer changes the prompt to ask the model to explain its reasoning step by step before giving the final answer, and accuracy improves. Which technique did the developer use?',
    options: [
      'Prompt injection',
      'Negative prompting',
      'Chain-of-thought prompting',
      'Retrieval Augmented Generation (RAG)',
    ],
    answer: [2],
    explanation:
      'Chain-of-thought prompting asks the model to work through intermediate reasoning steps, which often improves accuracy on multi-step problems. Prompt injection is an attack, negative prompting tells a model what to avoid (common in image generation), and RAG adds retrieved external data rather than structured reasoning.',
  },

  // ---------------- Guidelines for Responsible AI ----------------
  {
    id: 'aif-019',
    domain: 'Guidelines for Responsible AI',
    question:
      'A bank is building a credit-approval model in Amazon SageMaker. Before deployment, the bank must check whether the training data and the model\'s predictions are biased against certain demographic groups, and it needs to explain which features drive individual predictions. Which AWS service or feature should it use?',
    options: [
      'Amazon SageMaker Clarify',
      'Amazon SageMaker Model Monitor',
      'Amazon Rekognition',
      'AWS CloudTrail',
    ],
    answer: [0],
    explanation:
      'SageMaker Clarify detects bias in datasets and model predictions and gives feature-attribution explanations (for example, SHAP-based) for model behavior. Model Monitor watches deployed models for data and quality drift over time, Rekognition analyzes images and video, and CloudTrail records API activity.',
  },
  {
    id: 'aif-020',
    domain: 'Guidelines for Responsible AI',
    question:
      'A company\'s governance team requires that every production ML model have a single record that describes its intended use, training details, evaluation results, and risk rating, so that auditors and stakeholders can review it. Which AWS feature is designed for this?',
    options: [
      'Amazon SageMaker Feature Store',
      'Amazon SageMaker Ground Truth',
      'AWS Config',
      'Amazon SageMaker Model Cards',
    ],
    answer: [3],
    explanation:
      'SageMaker Model Cards document key facts about a model, such as intended use, training details, evaluation results and risk rating, which supports transparency and governance. Feature Store stores ML features, Ground Truth is for data labeling, and AWS Config tracks AWS resource configuration rather than model documentation.',
  },
  {
    id: 'aif-021',
    domain: 'Guidelines for Responsible AI',
    question:
      'A company is deploying a public-facing generative AI assistant on Amazon Bedrock. It must stop the assistant from discussing investment advice and must prevent customers\' personal information from appearing in responses. Which Amazon Bedrock Guardrails capabilities meet these requirements? (Choose TWO.)',
    options: [
      'Automatic fine-tuning of the underlying model on blocked conversations',
      'Provisioning dedicated GPU capacity for the model',
      'Denied topics that block the assistant from engaging on defined subjects',
      'Encrypting the model weights with a customer managed AWS KMS key',
      'Sensitive information filters that detect and block or mask personally identifiable information (PII)',
    ],
    answer: [2, 4],
    explanation:
      'Bedrock Guardrails lets you define denied topics (such as investment advice) and set up sensitive information filters that block or mask PII in inputs and outputs. Guardrails do not fine-tune models or provision compute, and encryption with KMS is a separate data-protection control, not a Guardrails feature.',
  },
  {
    id: 'aif-022',
    domain: 'Guidelines for Responsible AI',
    question:
      'A company uses an ML model to extract information from loan documents. For predictions with low confidence scores, the company wants a human reviewer to check and correct the result before it is used. Which AWS service provides this human-in-the-loop review workflow?',
    options: [
      'Amazon Comprehend',
      'Amazon Augmented AI (Amazon A2I)',
      'Amazon Polly',
      'Amazon Kendra',
    ],
    answer: [1],
    explanation:
      'Amazon Augmented AI (A2I) provides human review workflows for ML predictions, for example sending low-confidence results to reviewers, which supports accuracy and responsible use. Comprehend is an NLP service, Polly turns text into speech, and Kendra is an intelligent enterprise search service. None of them provide human review loops.',
  },

  // ---------------- Security, Compliance, and Governance for AI Solutions ----------------
  {
    id: 'aif-023',
    domain: 'Security, Compliance, and Governance for AI Solutions',
    question:
      'A company builds a generative AI application on Amazon Bedrock. Under the AWS shared responsibility model, which task is the responsibility of the customer?',
    options: [
      'Maintaining the physical security of the data centers that host the models',
      'Patching the underlying infrastructure that runs the Bedrock service',
      'Configuring IAM policies that control which users and roles can invoke models and access application data',
      'Managing the hardware that runs foundation model inference',
    ],
    answer: [2],
    explanation:
      'AWS is responsible for security of the cloud, which covers physical facilities, hardware and the managed service infrastructure. The customer is responsible for security in the cloud, which includes identity and access management, data protection and how its application uses the service. Writing IAM policies for model access is therefore the customer\'s job.',
  },
  {
    id: 'aif-024',
    domain: 'Security, Compliance, and Governance for AI Solutions',
    question:
      'A healthcare company runs applications in a VPC with no internet gateway. Security policy requires that calls from these applications to Amazon Bedrock must not travel over the public internet. Which solution meets this requirement?',
    options: [
      'Create an interface VPC endpoint for Amazon Bedrock by using AWS PrivateLink.',
      'Add a NAT gateway to the VPC and route Bedrock traffic through it.',
      'Enable Amazon Bedrock model invocation logging.',
      'Attach an internet gateway and restrict traffic with security groups.',
    ],
    answer: [0],
    explanation:
      'AWS PrivateLink interface VPC endpoints give private connectivity from a VPC to supported AWS services such as Amazon Bedrock, so traffic stays on the AWS network and does not cross the public internet. NAT and internet gateways send traffic to public endpoints, and invocation logging records requests but does not change how the network traffic flows.',
  },
  {
    id: 'aif-025',
    domain: 'Security, Compliance, and Governance for AI Solutions',
    question:
      'An auditor asks a company to show which IAM users and roles made management API calls to Amazon Bedrock and Amazon SageMaker, and when those calls happened. Which AWS service provides this record?',
    options: [
      'Amazon Inspector',
      'AWS Trusted Advisor',
      'Amazon Macie',
      'AWS CloudTrail',
    ],
    answer: [3],
    explanation:
      'AWS CloudTrail records API activity in an AWS account, including who made each call, when, and from where, which is what auditors need for governance and compliance. Inspector scans workloads for software vulnerabilities, Trusted Advisor gives best-practice recommendations, and Macie finds sensitive data in Amazon S3.',
  },
];

export default questions;
