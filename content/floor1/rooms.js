// ============================================
// FLOOR 1 - ALL 7 ROOMS CONTENT
// THIS IS THE FILE YOU'LL EDIT TO ADD/CHANGE CONTENT
// ============================================

const rooms = [
  // ============================================
  // ROOM 1: Why Big Data?
  {
    id: 1,
    title: 'Why Big Data?',
    subtitle: 'Understanding the 5 Vs and why traditional databases failed',
    sections: {
      context: {
        content: `In 2000, most companies stored data in relational databases (MySQL, Oracle, SQL Server). These worked fine when data fit on one machine, growth was predictable, and everything was structured in neat tables.

Then the internet exploded. Companies like Google, Facebook, Amazon suddenly had billions of users, petabytes of logs/photos/videos, and data arriving every millisecond.

Traditional databases started failing. Not because they were bad—they just weren't designed for this scale.`
      },
      concept: {
        title: 'The 5 Vs of Big Data',
        content: `IBM researchers identified exactly where traditional systems broke:

**1. Volume - Too Much Data**
Facebook: 350 million photos uploaded DAILY (2024). Can't fit on one machine anymore. Buying bigger servers hits physical limits.

**2. Variety - Different Types**
Traditional DB: Nice structured tables. Modern reality: JSON logs, images, videos, sensor data, PDFs. Forcing everything into tables = nightmare.

**3. Velocity - Real-Time Speed**
Twitter: 6,000 tweets per SECOND. Traditional batch processing (run reports overnight) is too slow. Need systems that process as data arrives.

**4. Veracity - Quality Issues**
30% of business data is inaccurate (Gartner). Typos, duplicates, missing values. Need systems that can handle "dirty" data.

**5. Value - Signal vs Noise**
90% of data is never analyzed. Finding the 10% that matters is the challenge. Need tools to extract insights from massive datasets.`,
        keyInsight: 'These five characteristics define Big Data and explain why traditional systems fail at scale.'
      },
      realworld: {
        title: "Google's Breaking Point (2003)",
        content: `Google was crawling 8 billion web pages. Their systems couldn't handle it because:

**The storage problem:**
• Raw HTML + metadata + links = ~20 Petabytes
• Oracle/MySQL databases couldn't hold 20 PB on one machine
• Splitting across multiple databases manually = "Which of 1000 servers has amazon.com?"

**The processing problem:**
• Needed to build inverted index daily (web changes constantly)
• Traditional approach: Load all data → process → save results
• But loading 20 PB from disk takes WEEKS
• By the time processing finishes, data is outdated

**The specific breaking point:**
They needed to transform normal data (amazon.com → [shoes, books, electronics]) into an inverted index (shoes → [amazon.com, ebay.com, target.com]) for search. Traditional databases took 30+ days to build the index.

**Google's solution: MapReduce + GFS** (which became Hadoop + HDFS). Index building time went from 30 days → 6 hours. This forced the entire industry to rethink data architecture.`,
        stats: [
          { label: 'Web Pages', value: '8 Billion' },
          { label: 'Storage Needed', value: '20 PB' },
          { label: 'Time Saved', value: '30d → 6h' }
        ]
      }
    },
    transition:
      'This forced companies to rethink everything. They needed a new approach to scaling. That\'s when the debate began: should we make one machine more powerful, or use many small machines?'
  },

  // ============================================
  // ROOM 2: Vertical vs Horizontal Scaling
  // ============================================
  {
    id: 2,
    title: 'Vertical vs Horizontal Scaling',
    subtitle: 'Why distributed systems replaced monolithic architectures',
    sections: {
      context: {
        content: `When databases hit their limits, engineers had two choices. Your application is slow. Users are complaining. What do you do?

**Old answer: Vertical Scaling** - Buy a bigger server. More CPU, more RAM, more disk. Like upgrading from a sedan to a monster truck.

**New answer: Horizontal Scaling** - Buy more small servers. Distribute workload across many machines. Like having 10 sedans instead of 1 monster truck.`
      },
      concept: {
        title: 'Why Vertical Scaling Failed',
        content: `**Physical Limits**
You can only add so much RAM/CPU to one machine. Eventually, the motherboard maxes out. The laws of physics say no.

**Cost Explosion**
Doubling capacity does not equal double price. High-end servers cost exponentially more.
• 16 GB RAM server = $1,000
• 128 GB RAM server = $15,000

That's 8x the RAM for 15x the cost.

**Single Point of Failure (SPOF)**
If your monster server crashes, everything stops. Downtime = lost revenue.
• Amazon loses $220,000 PER MINUTE of downtime
• One hardware failure = entire business down

**The Horizontal Alternative**
Same total cost, but spread across many machines:
• If 1 machine fails, 99 others keep working
• Can add machines infinitely as you grow
• Linear cost scaling instead of exponential`,
        keyInsight:
          "Horizontal is harder to build but better for scale. That's why Hadoop, Spark, Kafka exist—to make horizontal scaling manageable."
      },
      realworld: {
        title: "Facebook's $500,000 Choice (2009)",
        content: `Facebook outgrew MySQL on big servers. They faced a critical decision:

**Option A: Vertical Scaling**
• Buy a $500,000 enterprise server from Oracle
• Fast, but still one machine
• What happens when it fills up? Buy another for $500k?
• If it crashes, Facebook is down globally
• Dead end strategy

**Option B: Horizontal Scaling**
• Buy 100 cheap servers @ $5,000 each
• Total cost: Same ($500,000)
• Distribute data across all of them
• If 1 crashes, 99 others keep working
• Can add more servers as needed
• Path to unlimited growth

**The Decision**
They chose Option B—which is why they invested heavily in Hadoop and built their own distributed systems. Today, Facebook runs one of the largest Hadoop clusters in the world.`,
        stats: [
          { label: 'Servers', value: '100 Small' },
          { label: 'Total Cost', value: '$500K' },
          { label: 'Failure Impact', value: '1% Not 100%' }
        ]
      }
    },
    transition:
      'Facebook chose horizontal scaling—100 cheap servers instead of 1 expensive one. But now they faced a new problem: how do you actually store a file across 100 machines?'
  },

  // ============================================
  // ROOM 3: HDFS Architecture
  // ============================================
  {
    id: 3,
    title: 'HDFS Architecture',
    subtitle: 'The blueprint for distributed file systems',
    sections: {
      context: {
        content: `You've committed to horizontal scaling. But distributed storage isn't simple. If you save a file on Server #47, how do you find it later? What if Server #47 crashes? What if the file is too big for one server?

Traditional file systems assume one computer. When you save a file, it goes to one disk. When you open it, you read from that disk. Simple.

But with 100 servers, nothing is simple anymore. You need a system that splits large files into pieces, distributes pieces across servers, remembers which piece is where, and survives when servers crash.`
      },
      concept: {
        title: 'Master-Slave Architecture',
        content: `HDFS uses a brilliantly simple design. Think of it like a library system:

**NameNode (The Master)**
• ONE master node per cluster
• Stores only metadata (not actual data)
• Knows which blocks belong to which files
• Tracks which DataNode stores each block
• Like a library catalog—doesn't hold books, just references

**DataNodes (The Slaves)**
• MANY worker nodes (could be thousands)
• Store actual data blocks on disk
• Send heartbeats to NameNode every 3 seconds
• If heartbeat stops, node is marked dead
• Like library shelves—hold the actual books

**How It Works**
When you upload a 500 MB file:
1. File splits into blocks (128 MB each) → 4 blocks
2. Blocks distributed across DataNodes
3. NameNode records: "file.mp4 → Block 1 on DN5, Block 2 on DN12, Block 3 on DN23, Block 4 on DN8"
4. When you read the file, NameNode tells you where blocks are
5. You fetch blocks directly from DataNodes in parallel
6. Reassemble into original file`,
        keyInsight:
          "The NameNode doesn't store your files—it only stores the MAP of where pieces live. Like Google doesn't store websites, just references to them. In a 10 PB cluster, NameNode might use only 64 GB RAM for metadata."
      },
      realworld: {
        title: "Yahoo's 42,000-Node Cluster (2012)",
        content: `Yahoo operated one of the largest Hadoop clusters in history. This wasn't a toy—it was production infrastructure serving millions of users.

**The Scale**
• 42,000 DataNodes across multiple datacenters
• 600+ Petabytes of total storage capacity
• Billions of files tracked by the NameNode
• Serving Yahoo Mail, Search, and other services

**The NameNode's Job**
• Track metadata for billions of files
• Know which of 42,000 nodes has each block
• Detect when nodes crash (via heartbeat monitoring)
• Coordinate automatic data replication
• Serve metadata queries in milliseconds

**Why This Architecture Works**
NameNode stores only lightweight metadata in RAM—maybe 64 GB for managing petabytes. DataNodes do the heavy lifting. Parallel reads from multiple nodes make data access blazing fast. This separation of concerns is why HDFS scaled to enterprise needs.`,
        stats: [
          { label: 'DataNodes', value: '42,000' },
          { label: 'Storage', value: '600+ PB' },
          { label: 'Files', value: 'Billions' }
        ]
      }
    },
    hasInteractive: false,
    transition:
      'HDFS solved the storage problem with NameNode + DataNodes. But one critical decision remained: how big should each block be?'
  },

  // ============================================
  // ROOM 4: Block Size Optimization
  // ============================================
  {
    id: 4,
    title: 'Block Size Optimization',
    subtitle: 'Why 128 MB is the sweet spot',
    sections: {
      context: {
        content: `When HDFS splits files, it uses 128 MB blocks by default. Why not 64 MB? Why not 256 MB? This isn't arbitrary—it's a carefully chosen trade-off based on cluster design and workload patterns.

The block size decision affects three critical factors: parallelism (how many tasks can run simultaneously), metadata overhead (how much the NameNode must track), and network efficiency (how many requests needed to fetch a file).`
      },
      concept: {
        title: 'The Two Forces Pulling in Opposite Directions',
        content: `**Smaller Blocks (e.g., 64 MB)**

Pros:
• More parallelism (more tasks can run simultaneously)
• Better for small files
• Finer-grained data distribution

Cons:
• More metadata entries for NameNode to track
• More network requests to fetch all blocks
• NameNode memory pressure increases

**Larger Blocks (e.g., 256 MB)**

Pros:
• Less metadata overhead
• Fewer network requests
• NameNode has easier job

Cons:
• Less parallelism (fewer tasks can run)
• Wasted space for small files
• Slower for interactive queries

**The Math: Processing a 1 GB File with Spark**

With 64 MB blocks:
• 1 GB ÷ 64 MB = 16 blocks
• Can spawn 16 parallel tasks
• NameNode tracks 16 metadata entries
• But if you have only 8 CPU cores, 8 tasks wait idle

With 128 MB blocks:
• 1 GB ÷ 128 MB = 8 blocks
• Can spawn 8 parallel tasks
• NameNode tracks 8 metadata entries
• Perfect match for 8-core machine

With 256 MB blocks:
• 1 GB ÷ 256 MB = 4 blocks
• Can spawn only 4 parallel tasks
• NameNode tracks 4 metadata entries
• But 4 cores sit idle, underutilized

**Verdict:** 128 MB balances parallelism with overhead. It assumes most commodity servers have 8-16 cores, which was the standard when Hadoop was designed (and still is).`,
        keyInsight:
          '128 MB is optimal for most workloads because it matches typical server hardware (8-16 cores) while keeping NameNode metadata manageable.'
      },
      realworld: {
        title: 'Evolution of Block Size',
        content: `**Hadoop 1.x (2006): 64 MB blocks**
• Servers had 4-8 cores
• Smaller RAM (2-4 GB typical)
• Needed more parallelism from smaller blocks

**Hadoop 2.x (2012): 128 MB blocks**
• Servers upgraded to 8-16 cores
• More RAM (16-32 GB typical)
• Could handle fewer, larger blocks

**Modern Cloud (2024): Customizable**
• AWS EMR, Databricks allow configuration
• For huge files (100 GB+), use 256 MB or 512 MB to reduce overhead
• For small files (<128 MB), use 64 MB to avoid waste
• Most keep 128 MB as default

**When to Change Block Size**

Use smaller blocks (64 MB) when:
• You have many small files (1-100 MB each)
• You want maximum parallelism
• You have tons of CPU cores available

Use larger blocks (256 MB) when:
• You have huge files (10 GB+ each)
• NameNode is running out of memory
• Most of your workload is sequential scans`,
        stats: [
          { label: 'Hadoop 1.x', value: '64 MB' },
          { label: 'Hadoop 2.x+', value: '128 MB' },
          { label: 'Modern', value: 'Configurable' }
        ]
      }
    },
    hasInteractive: true,
    transition:
      "Block size optimization is crucial, but it's worthless if data isn't protected. What happens when a DataNode crashes? That's where replication comes in."
  },

  // ============================================
  // ROOM 5: Replication & Fault Tolerance
  // ============================================
  {
    id: 5,
    title: 'Replication & Fault Tolerance',
    subtitle: 'How HDFS survives failures automatically',
    sections: {
      context: {
        content: `You've split your 1 GB file into 8 blocks of 128 MB each. They're distributed across 8 different DataNodes. Everything works perfectly. Then DataNode #3 crashes—disk failure, power outage, network issue. Your Block #3 is gone.

In a traditional system, this means data loss. Game over. But HDFS was designed with a core assumption: failures WILL happen. In a 1000-node cluster, nodes fail daily. HDFS must handle this gracefully, automatically, with zero human intervention.`
      },
      concept: {
        title: 'The Triple Copy Law',
        content: `**Replication Factor = 3 (Default)**
Every block is stored on THREE different DataNodes. Not one, not two—three. This isn't excessive; it's calculated risk management.

**How It Works**
When you upload a file:
1. Client writes Block B1 to DataNode #5
2. DataNode #5 immediately copies B1 to DataNode #12
3. DataNode #12 copies B1 to DataNode #23
4. NameNode records: "B1 lives on DN5, DN12, DN23"

Now you have three copies. If any one or even two DataNodes fail, you still have the data.

**Rack Awareness**
But what if all three DataNodes are in the same server rack, and that rack loses power? All three copies die together.

HDFS is rack-aware:
• First copy: Local rack (fast write)
• Second copy: Same rack, different node (balance speed + safety)
• Third copy: Different rack entirely (survive rack failures)

This spreads replicas across physical locations—different racks, potentially different datacenters.

**Self-Healing in Action**

Scenario: DataNode #5 crashes.

1. DataNode #5 stops sending heartbeats (3-second intervals)
2. After 10 missed heartbeats (30 seconds), NameNode marks it dead
3. NameNode checks: "Which blocks lived on DN5?"
4. For each block, NameNode sees: "Only 2 copies remain (should be 3)"
5. NameNode instructs surviving DataNodes: "Create new replica"
6. Within minutes, replication factor restored to 3
7. System returns to perfect health

No human intervention. No data loss. Completely automatic.

**Why Factor 3?**
• Factor 2: Not enough (one failure = single copy remaining)
• Factor 4+: Expensive (4x storage cost for marginal benefit)
• Factor 3: Sweet spot (survives 2 simultaneous failures, reasonable cost)`,
        keyInsight:
          'HDFS assumes failure is normal, not exceptional. Self-healing means the system automatically restores lost data without human intervention. In large clusters, this happens constantly in the background.'
      },
      realworld: {
        title: 'Netflix and Failure Management',
        content: `Netflix runs massive Hadoop clusters for processing video analytics, recommendation algorithms, and A/B testing data. They learned hard lessons about fault tolerance.

**The Challenge**
• Thousands of nodes across multiple AWS availability zones
• Nodes fail constantly (EC2 instance terminations, network issues, disk failures)
• Can't afford data loss or manual intervention

**Their Approach**
• Replication factor 3 as baseline
• For critical data (billing, user accounts): Factor 4
• For temporary data (daily analytics): Factor 2
• Rack awareness configured for AWS availability zones
• Automated monitoring alerts if replication drops below threshold

**Real Incident**
Once, an entire AWS availability zone went down (their "rack" equivalent). Thousands of DataNodes disappeared simultaneously. HDFS detected the failure within seconds, began re-replication from surviving zones, and restored full replication within hours. Zero data loss. Zero manual intervention.

**Cost vs. Safety**
At Netflix's scale, Factor 3 means storing 3 PB to hold 1 PB of actual data. That's expensive. But it's cheaper than:
• Data loss lawsuits
• Lost customer trust
• Engineering time manually recovering data
• System downtime

The math favors replication.`,
        stats: [
          { label: 'Default Factor', value: '3 Copies' },
          { label: 'Can Survive', value: '2 Failures' },
          { label: 'Recovery Time', value: 'Minutes' }
        ]
      }
    },
    transition:
      'Replication protects DataNodes beautifully. But there\'s one component we haven\'t protected yet: the NameNode itself. What happens if the NameNode crashes?'
  },

  // ============================================
  // ROOM 6: NameNode High Availability
  // ============================================
  {
    id: 6,
    title: 'NameNode High Availability',
    subtitle: 'Eliminating the single point of failure',
    sections: {
      context: {
        content: `DataNodes are protected by replication. Block data exists in three places. But the NameNode—the brain that knows where everything is—exists in only ONE place. This is a catastrophic design flaw called Single Point of Failure (SPOF).

If the NameNode crashes in Hadoop 1.x, the entire cluster becomes useless. You have petabytes of data spread across thousands of nodes, but no index to find anything. It's like having a massive library with every book but no catalog. The data exists, but it's inaccessible.`
      },
      concept: {
        title: 'From SPOF to High Availability',
        content: `**The Hadoop 1.x Problem**
• ONE NameNode holds all metadata
• If NameNode crashes, cluster is down
• Recovery requires manual admin intervention
• Downtime measured in hours or days
• For enterprises, this was unacceptable

**Secondary NameNode (The Misunderstood Solution)**
Hadoop 1.x introduced "Secondary NameNode"—but it's NOT a backup! Common misconception.

What Secondary NameNode actually does:
• Periodically creates metadata checkpoints
• Merges edit logs to prevent NameNode memory bloat
• Helps NameNode restart faster after crash
• But it does NOT provide automatic failover
• If NameNode dies, admin must manually restore from checkpoint

**The Real Solution: Hadoop 2.x High Availability**

Architecture:
• Active NameNode: Handles all requests, manages metadata
• Standby NameNode: Stays synchronized, ready to take over
• Shared storage (NFS or QJM): Both NameNodes write here
• ZooKeeper: Coordinates which NameNode is active

**How Automatic Failover Works**

Normal operation:
1. Active NameNode handles all requests
2. Writes edit logs to shared storage
3. Standby NameNode reads same logs, stays synchronized
4. ZooKeeper monitors Active NameNode health

When Active NameNode fails:
1. ZooKeeper detects failure (missed heartbeats)
2. ZooKeeper promotes Standby to Active
3. Standby (now Active) starts handling requests
4. Total downtime: ~30 seconds
5. When failed node recovers, it becomes new Standby

**ZooKeeper's Critical Role**
• Prevents split-brain (two NameNodes both thinking they're active)
• Provides distributed consensus
• Ensures exactly one Active NameNode at any time
• Coordinates failover automatically

**NameNode Federation (Scalability)**
As clusters grew, even NameNode HA wasn't enough. One NameNode struggles with hundreds of millions of files.

Solution: Multiple NameNodes, each managing different namespaces
• NameNode 1: /user/* (user data)
• NameNode 2: /apps/* (application data)
• NameNode 3: /system/* (system data)

Each NameNode has its own Active/Standby pair. Distributes metadata load horizontally.`,
        keyInsight:
          'High Availability transformed HDFS from "usable for batch jobs" to "enterprise-ready for critical systems." Automatic failover means human intervention is no longer required for common failures.'
      },
      realworld: {
        title: 'LinkedIn and NameNode HA',
        content: `LinkedIn runs multiple massive Hadoop clusters for their recommendation engine, analytics, and data pipelines. NameNode failures used to mean significant downtime.

**Before HA (Hadoop 1.x)**
• NameNode crash = 2-4 hours downtime
• Required senior engineer to manually restore
• Happened ~monthly across all clusters
• Lost revenue + frustrated data scientists

**After HA (Hadoop 2.x)**
• Automatic failover in ~30 seconds
• No human intervention needed
• Transparent to users (brief slowdown, no outage)
• Failures still happen monthly, but nobody notices

**Their Configuration**
• Active/Standby NameNode pair per cluster
• QJM (Quorum Journal Manager) for shared storage
• ZooKeeper ensemble (5 nodes for high availability)
• Automatic failover enabled
• Federation for largest clusters (>500M files)

**Cost vs. Benefit**
Running Standby NameNode doubles NameNode infrastructure cost. But:
• Eliminates hours of downtime
• No need for 24/7 on-call engineers
• Enables treating Hadoop as critical infrastructure
• Allows scheduled maintenance without downtime

For LinkedIn, the ROI was obvious. They rolled out HA across all production clusters within months of Hadoop 2.x release.`,
        stats: [
          { label: 'Failover Time', value: '~30 seconds' },
          { label: 'Manual Work', value: 'Zero' },
          { label: 'Downtime', value: 'Near Zero' }
        ]
      }
    },
    transition:
      'HDFS with NameNode HA became enterprise-ready. But by then, a new paradigm was emerging: cloud storage. Could object stores like S3 replace HDFS entirely?'
  },

  // ============================================
  // ROOM 7: Cloud Data Lakes vs HDFS
  // ============================================
  {
    id: 7,
    title: 'Cloud Data Lakes vs HDFS',
    subtitle: 'Why modern architectures chose object storage',
    sections: {
      context: {
        content: `You've mastered HDFS: blocks, replication, NameNode HA. It's powerful, battle-tested technology. Then AWS announces S3 (2006), Azure launches ADLS (2015), and suddenly everyone's talking about "cloud data lakes." Are they just HDFS in the cloud? Or fundamentally different?

The answer: fundamentally different. And understanding why reveals the future of data architecture.`
      },
      concept: {
        title: 'Block Storage vs Object Storage',
        content: `**HDFS: Block-Based Storage**
• Files split into fixed blocks (128 MB)
• Blocks distributed across DataNodes
• NameNode tracks block locations
• Tightly coupled with compute cluster
• Storage and compute scale together

**Cloud (S3/ADLS): Object-Based Storage**
• Files stored as complete objects
• Each object = ID + Data + Metadata
• Rich metadata (permissions, tags, creation date)
• Completely decoupled from compute
• Storage and compute scale independently

**The Coupling Difference (Most Important)**

HDFS coupling:
• Storage lives INSIDE the cluster
• Want more storage? Add DataNodes
• But adding DataNodes also adds CPU + RAM
• Even if you just need storage, you pay for compute
• If cluster deleted, storage deleted too

Cloud decoupling:
• Storage exists independently (S3 buckets, ADLS containers)
• Want more storage? Just upload more files
• Compute (Spark/Databricks) spins up only when needed
• When compute shuts down, storage remains
• Can access same storage from multiple compute clusters

**Practical Implications**

Scenario: You have 10 PB of historical data, rarely accessed.

With HDFS:
• Must keep cluster running 24/7
• Pay for DataNodes + electricity + maintenance
• Even though data sits idle most of the time

With S3/ADLS:
• Data sits in cold storage (very cheap)
• Spin up Spark cluster only when needed (maybe 2 hours/week)
• Pay storage cost ($230/month) + minimal compute cost
• 95%+ cost savings

**Accessibility Difference**

HDFS:
• Data belongs to ONE cluster
• Cluster A can't easily read Cluster B's data
• Data silos form naturally

Cloud:
• One S3 bucket can be accessed by:
  - Multiple Spark clusters
  - Databricks notebooks
  - AWS Athena (serverless SQL)
  - SageMaker (ML)
  - Your own applications via API
• True data lake: centralized, accessible storage

**Scalability Difference**

HDFS:
• Scale = add more nodes (complex)
• NameNode eventually bottlenecks
• Practical limit ~100-200 PB per cluster

Cloud:
• Scale = virtually unlimited
• No "node" concept to manage
• S3 stores exabytes globally
• You never think about capacity`,
        keyInsight:
          'The decoupling of storage and compute is the fundamental innovation of cloud data lakes. This architectural shift enables modern data platforms where storage is cheap, permanent, and accessible from anywhere.'
      },
      realworld: {
        title: "Airbnb's Migration from HDFS to S3",
        content: `Airbnb ran large Hadoop clusters on AWS EC2 for years. They had hundreds of terabytes in HDFS. Then they made a critical decision: migrate everything to S3. Here's why and how:

**The HDFS Pain Points**
• Running 24/7 clusters for occasional analytics = expensive
• Scaling meant adding entire nodes (storage + CPU together)
• Data siloed per cluster (search cluster can't access ML cluster data)
• Cluster upgrades required careful data migration
• Infrastructure team spent 40% time on cluster maintenance

**The S3 Migration**

Phase 1: Dual-write (6 months)
• Write all new data to both HDFS and S3
• Gradually backfill historical data to S3
• Test S3-based pipelines in parallel

Phase 2: Cutover (3 months)
• Switch compute to read from S3
• Decommission HDFS clusters
• Move to ephemeral Spark clusters (spin up/down on demand)

Phase 3: Optimization (ongoing)
• Implement data lake best practices
• Partition data by date/region for query performance
• Use Parquet format for columnar compression
• Set up lifecycle policies (archive cold data to Glacier)

**Results After 1 Year**
• Infrastructure cost: Down 60%
• Data accessibility: Up 10x (any service can access S3)
• Team velocity: Up 40% (less time on cluster maintenance)
• Storage scalability: From 500 TB to 5 PB (10x growth without infrastructure panic)

**The Trade-offs**
Not everything improved:
• Network data transfer costs (reading from S3 costs money)
• Slightly slower for some workloads (network latency vs. local disk)
• New challenges (managing S3 bucket permissions, lifecycle policies)

But overall: Clear win. Airbnb hasn't looked back.`,
        stats: [
          { label: 'Cost Reduction', value: '60%' },
          { label: 'Accessibility', value: '10x Better' },
          { label: 'Scalability', value: 'Unlimited' }
        ]
      }
    }
  }
];

export default rooms;
