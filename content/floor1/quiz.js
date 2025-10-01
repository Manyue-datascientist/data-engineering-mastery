// ============================================
// FLOOR 1 QUIZ - 15 QUESTIONS
// TO ADD A QUESTION: Copy a question object and edit it
// ============================================

const quiz = {
  title: 'Floor 1 Assessment',
  description: 'Test your understanding of Big Data foundations',
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: 'Which of the 5 Vs describes "data arriving continuously from sensors"?',
      options: ['Volume', 'Velocity', 'Variety', 'Veracity'],
      correct: 1,
      explanation: 'Velocity refers to the speed at which data arrives. Real-time streams from IoT sensors, social media, and transactions are classic velocity challenges.'
    },
    {
      id: 2,
      question: 'What is the biggest problem with vertical scaling?',
      options: [
        'It is too expensive',
        'Single Point of Failure - if it fails, everything stops',
        'It is slower than horizontal',
        'It uses too much electricity'
      ],
      correct: 1,
      explanation: 'While cost is a concern, the critical flaw is SPOF. One machine failure means total downtime. Horizontal scaling distributes risk across many machines.'
    },
    {
      id: 3,
      question: 'In HDFS, what does the NameNode store?',
      options: [
        'All the actual data files',
        'Only metadata - which blocks belong to which files and where they are located',
        'Backup copies for safety',
        'Just the file names'
      ],
      correct: 1,
      explanation: 'NameNode stores only metadata (the index). It is like Google Search - does not store websites, just references. In a 10 PB cluster, NameNode might use only 64 GB RAM.'
    },
    {
      id: 4,
      question: 'Why is HDFS block size 128 MB by default instead of 64 MB?',
      options: [
        'Because 128 is a nice round number',
        'To balance parallelism with NameNode metadata overhead',
        'Smaller blocks are always worse',
        'To save disk space'
      ],
      correct: 1,
      explanation: 'More blocks means more parallel tasks (good) BUT more metadata for NameNode to track (bad). 128 MB is the proven sweet spot for 8-16 core servers.'
    },
    {
      id: 5,
      question: 'What is the default replication factor in HDFS?',
      options: ['2', '3', '4', '5'],
      correct: 1,
      explanation: 'Factor 3 is the sweet spot. Can survive 2 simultaneous failures while keeping storage costs reasonable (3x instead of 4x or 5x).'
    },
    {
      id: 6,
      question: 'What happens when a DataNode fails in HDFS?',
      options: [
        'All data on that node is lost forever',
        'NameNode detects it and triggers automatic re-replication from other copies',
        'Engineers must manually restore the data',
        'The entire cluster shuts down'
      ],
      correct: 1,
      explanation: 'Self-healing! DataNodes send heartbeats every 3 seconds. If missed, NameNode marks it dead and instructs other nodes to create new replicas. Fully automatic.'
    },
    {
      id: 7,
      question: 'What was the Single Point of Failure in Hadoop 1.x?',
      options: [
        'DataNodes',
        'The NameNode',
        'Network switches',
        'Power supply'
      ],
      correct: 1,
      explanation: 'If the NameNode crashed, the entire cluster became useless despite having all data. Hadoop 2.x fixed this with Active/Standby NameNode pairs.'
    },
    {
      id: 8,
      question: 'How does Hadoop 2.x achieve NameNode High Availability?',
      options: [
        'Using Secondary NameNode as backup',
        'Active + Standby NameNodes with ZooKeeper coordination',
        'Replicating NameNode data to DataNodes',
        'Running multiple NameNodes independently'
      ],
      correct: 1,
      explanation: 'Active/Standby pair synchronized via shared storage, with ZooKeeper coordinating automatic failover. Secondary NameNode is NOT a backup.'
    },
    {
      id: 9,
      question: 'What is the main advantage of cloud storage (S3/ADLS) over HDFS?',
      options: [
        'It is always faster',
        'It is always cheaper',
        'Storage and compute are decoupled - scale independently',
        'It has better replication'
      ],
      correct: 2,
      explanation: 'Decoupling is the key innovation. Storage exists independently, compute spins up only when needed. HDFS ties them together, forcing you to scale both.'
    },
    {
      id: 10,
      question: 'In HDFS, how often do DataNodes send heartbeats to the NameNode?',
      options: ['Every second', 'Every 3 seconds', 'Every 10 seconds', 'Every minute'],
      correct: 1,
      explanation: 'Every 3 seconds. After 10 missed heartbeats (30 seconds), NameNode marks the node as dead and begins re-replication.'
    },
    {
      id: 11,
      question: 'Why did Google\'s traditional systems fail for web crawling?',
      options: [
        'They did not have enough programmers',
        'Loading 20 PB from disk took weeks - data was outdated before processing finished',
        'The servers were too old',
        'They used the wrong programming language'
      ],
      correct: 1,
      explanation: 'The velocity problem: By the time 20 PB was loaded and processed (weeks), the web had changed. They needed distributed processing (MapReduce) to parallelize the work.'
    },
    {
      id: 12,
      question: 'What does "rack awareness" mean in HDFS?',
      options: [
        'DataNodes know which rack they are in',
        'Replicas are distributed across different physical racks to survive rack failures',
        'Racks are labeled for easy identification',
        'Each rack has a dedicated NameNode'
      ],
      correct: 1,
      explanation: 'Distributing replicas across racks (potentially different datacenters) ensures that power/network failures in one rack do not kill all copies of data.'
    },
    {
      id: 13,
      question: 'Facebook chose horizontal scaling with 100 cheap servers instead of:',
      options: [
        'One $500,000 enterprise server',
        'Cloud computing',
        'Traditional databases',
        'Manual data entry'
      ],
      correct: 0,
      explanation: 'Same total cost ($500k), but distributed across many machines. If one fails, 99 others keep working. Single expensive server = single point of failure.'
    },
    {
      id: 14,
      question: 'What is ZooKeeper\'s role in HDFS High Availability?',
      options: [
        'Stores backup data',
        'Coordinates which NameNode is active and prevents split-brain',
        'Manages DataNode heartbeats',
        'Compresses data blocks'
      ],
      correct: 1,
      explanation: 'ZooKeeper provides distributed consensus, ensuring exactly one Active NameNode at any time and coordinating automatic failover.'
    },
    {
      id: 15,
      question: 'How much did Airbnb save by using S3 instead of HDFS?',
      options: [
        '20% cost reduction',
        '60% cost reduction',
        '10% cost reduction',
        'Costs increased but accessibility improved'
      ],
      correct: 1,
      explanation: 'Airbnb achieved 60% cost reduction by moving to S3. Ephemeral compute clusters (spin up only when needed) + cheap S3 storage = massive savings over 24/7 HDFS clusters.'
    }
  ]
};

export default quiz;