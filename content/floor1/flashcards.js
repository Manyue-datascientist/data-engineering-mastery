// ============================================
// FLOOR 1 FLASHCARDS - 25 CARDS
// TO ADD A CARD: Copy a card object and edit it
// ============================================

const flashcards = [
  { id: 1, front: 'What are the 5 Vs of Big Data?', back: 'Volume (amount), Variety (types), Velocity (speed), Veracity (quality), Value (usefulness)' },
  { id: 2, front: 'What is vertical scaling?', back: 'Adding more CPU/RAM/disk to ONE machine (scale up)' },
  { id: 3, front: 'What is horizontal scaling?', back: 'Adding more machines to distribute workload (scale out)' },
  { id: 4, front: 'Why did vertical scaling fail?', back: 'Physical limits + exponential cost + Single Point of Failure' },
  { id: 5, front: 'What does the NameNode store?', back: 'Only metadata - the map of which blocks belong to which files and where they are located' },
  { id: 6, front: 'What do DataNodes store?', back: 'Actual data blocks (128 MB chunks of files)' },
  { id: 7, front: 'What is the default block size in HDFS?', back: '128 MB' },
  { id: 8, front: 'Why is block size 128 MB not 64 MB?', back: 'To balance parallelism (more blocks) vs NameNode overhead (fewer metadata entries)' },
  { id: 9, front: 'What is the replication factor?', back: 'Number of copies of each block - default is 3' },
  { id: 10, front: 'How often do DataNodes send heartbeats?', back: 'Every 3 seconds' },
  { id: 11, front: 'What happens when a DataNode fails?', back: 'NameNode detects it (missed heartbeats) and automatically triggers re-replication from surviving copies' },
  { id: 12, front: 'What is rack awareness?', back: 'Distributing block replicas across different physical server racks to survive rack failures' },
  { id: 13, front: 'What was the SPOF in Hadoop 1.x?', back: 'The NameNode - if it crashed, entire cluster became unusable' },
  { id: 14, front: 'How does Hadoop 2.x solve SPOF?', back: 'Active + Standby NameNodes with ZooKeeper-coordinated automatic failover' },
  { id: 15, front: 'What is ZooKeeper\'s role?', back: 'Ensures exactly one Active NameNode and coordinates automatic failover' },
  { id: 16, front: 'How many nodes did Yahoo\'s cluster have?', back: '42,000 DataNodes with 600+ PB storage' },
  { id: 17, front: 'HDFS vs Cloud: coupling difference?', back: 'HDFS tightly couples storage+compute; Cloud decouples them (scale independently)' },
  { id: 18, front: 'HDFS vs Cloud: storage type?', back: 'HDFS uses blocks (128 MB chunks); Cloud uses objects (complete files with metadata)' },
  { id: 19, front: 'What is self-healing in HDFS?', back: 'Automatic recreation of lost blocks when nodes fail - no human intervention needed' },
  { id: 20, front: 'What is metadata?', back: 'Data about data (file locations, sizes, permissions) - NOT the actual content' },
  { id: 21, front: 'Master-Slave architecture?', back: 'One coordinator (master) manages many workers (slaves) - NameNode + DataNodes' },
  { id: 22, front: 'Why does Google use distributed systems?', back: '20 PB of web crawl data - traditional systems took weeks to process, data was outdated' },
  { id: 23, front: 'Facebook\'s scaling choice?', back: '100 cheap servers ($5K each) instead of 1 expensive server ($500K) - same cost, better fault tolerance' },
  { id: 24, front: 'Cost: vertical vs horizontal?', back: 'Vertical: exponential cost increase; Horizontal: linear cost scaling' },
  { id: 25, front: 'What makes HDFS fault-tolerant?', back: 'Replication (3 copies) + Self-healing + Rack awareness + NameNode HA' }
];

export default flashcards;