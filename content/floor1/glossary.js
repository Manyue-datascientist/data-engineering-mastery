// ============================================
// FLOOR 1 GLOSSARY
// TO ADD A TERM: Copy a term object and edit it
// They will be automatically sorted alphabetically
// ============================================

const glossary = [
  { term: 'Big Data', definition: 'Data too large or complex for traditional databases to handle efficiently', category: 'foundational' },
  { term: 'Block', definition: 'Fixed-size chunk (default 128 MB) of a file in HDFS', category: 'hdfs' },
  { term: 'Block Size', definition: 'Size of data blocks in HDFS; affects parallelism vs metadata overhead', category: 'hdfs' },
  { term: 'DataNode', definition: 'Worker node storing actual data blocks in HDFS', category: 'hdfs' },
  { term: 'Distributed System', definition: 'Multiple machines working together as one coordinated system', category: 'foundational' },
  { term: 'Fault Tolerance', definition: 'System ability to continue operating despite component failures', category: 'foundational' },
  { term: 'Hadoop', definition: 'Open-source framework for distributed storage (HDFS) and processing (MapReduce)', category: 'ecosystem' },
  { term: 'HDFS', definition: 'Hadoop Distributed File System - splits files into blocks across many nodes', category: 'hdfs' },
  { term: 'Heartbeat', definition: '3-second signal DataNodes send to NameNode to confirm they are alive', category: 'hdfs' },
  { term: 'Horizontal Scaling', definition: 'Adding more machines to increase capacity (distributed approach)', category: 'foundational' },
  { term: 'Master-Slave Architecture', definition: 'Design pattern with one coordinator (master) managing multiple workers (slaves)', category: 'architecture' },
  { term: 'Metadata', definition: 'Data about data (file locations, sizes) - not the actual content', category: 'hdfs' },
  { term: 'NameNode', definition: 'Master node storing HDFS metadata (file-to-block mappings)', category: 'hdfs' },
  { term: 'NameNode Federation', definition: 'Multiple NameNodes each managing different namespaces for scalability', category: 'hdfs' },
  { term: 'Object Storage', definition: 'Cloud storage (S3/ADLS) where files stored as complete objects with rich metadata', category: 'cloud' },
  { term: 'Rack Awareness', definition: 'Distributing block replicas across different physical server racks', category: 'hdfs' },
  { term: 'Replication Factor', definition: 'Number of copies of each block (default: 3) for fault tolerance', category: 'hdfs' },
  { term: 'Secondary NameNode', definition: 'Creates metadata checkpoints; NOT a backup despite confusing name', category: 'hdfs' },
  { term: 'Self-Healing', definition: 'Automatic recreation of lost data blocks without human intervention', category: 'hdfs' },
  { term: 'Single Point of Failure (SPOF)', definition: 'Component whose failure stops the entire system', category: 'architecture' },
  { term: 'Standby NameNode', definition: 'Backup NameNode synchronized and ready for automatic failover', category: 'hdfs' },
  { term: 'Vertical Scaling', definition: 'Adding more CPU/RAM/disk to a single machine (scale up)', category: 'foundational' },
  { term: 'ZooKeeper', definition: 'Coordination service ensuring exactly one Active NameNode in HA setup', category: 'ecosystem' },
  { term: '5 Vs of Big Data', definition: 'Volume, Variety, Velocity, Veracity, Value - characteristics defining Big Data', category: 'foundational' }
];

export default glossary;