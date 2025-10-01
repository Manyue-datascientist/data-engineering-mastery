// ============================================
// FLOOR 1 SUMMARY
// TO EDIT: Just change the text below
// ============================================

const summary = `# Floor 1 Summary: Big Data Foundations

## The Big Picture

Traditional databases worked fine until the internet era brought exponential data growth. The 5 Vs (Volume, Variety, Velocity, Veracity, Value) forced a complete rethink of data architecture. Companies had to choose between vertical scaling (one big machine) or horizontal scaling (many small machines). Horizontal won due to better fault tolerance and unlimited scalability.

## What You Learned

### Why Big Data Exists
The 5 Vs broke traditional databases. Google's 20 PB web crawling problem couldn't be solved with traditional systems. Index building time: 30 days became 6 hours with distributed systems.

### Scaling Strategies
Vertical scaling equals expensive plus Single Point of Failure. Horizontal equals distributed plus resilient plus unlimited growth. Facebook chose 100 cheap servers at $5K each over 1 expensive server at $500K.

### HDFS Architecture
NameNode equals metadata index (master, knows where everything is). DataNodes equal actual storage (slaves, hold the data blocks). Yahoo ran 42,000-node cluster with 600+ PB storage. Master-Slave architecture enables massive scale.

### Block Size (128 MB Default)
64 MB equals more parallelism, more NameNode overhead. 256 MB equals less parallelism, lighter NameNode load. 128 MB equals optimal balance for typical 8-16 core servers.

### Replication (Factor 3)
Every block stored on 3 different DataNodes. Self-healing: automatic re-replication when nodes fail. Rack awareness: replicas distributed across physical locations. Can survive 2 simultaneous failures.

### NameNode High Availability
Hadoop 1.x had Single Point of Failure (NameNode crash equals cluster down). Hadoop 2.x introduced Active plus Standby NameNodes. ZooKeeper coordinates automatic failover (~30 seconds). Secondary NameNode is not equal to backup (common misconception).

### Cloud vs HDFS
HDFS equals block storage, tightly coupled compute plus storage. Cloud (S3/ADLS) equals object storage, completely decoupled. Cloud enables ephemeral compute (spin up only when needed). Cost savings: 60%+ for typical workloads. Accessibility: Same storage accessible from multiple services.

## Key Insight

Distributed systems are not just "bigger" versions of traditional systems—they are fundamentally different. Understanding HDFS architecture (blocks, replication, NameNode/DataNode separation) is the foundation for everything in modern data engineering. The shift from on-prem HDFS to cloud object storage (S3/ADLS) represents the next evolution: decoupling storage from compute for ultimate flexibility and cost efficiency.`;

export default summary;