## Section 1 - Introduciton
#### Motivation

***Parallel Computing:*** Is the computation performed on a *parallel computer* that:
+ Executes concurrently several instructions for the resolution of a single problem

***Sequential Computer:*** Follows the conventional (von Neuman) architecture and instructions are executed sequentially one after the other

#### Why parallel Computing

There is a tendency to include more parallelism support in the hardware:
+ Clock frequency limited by the light speed
+ Larger integration scale unfeasible due to heating problems

As well as, sequential computing does not cover the needs:
+ Large scale problems
+ Real time

**Simulation:** emulate a physical system using a computer, they often require a large computation capacity. (Virtual prototyping, complex geometry...)
**Data processing of large scientific challenges:** require acquiring, storing and processing large data volumes. (High energy physics => Particle colliders)

#### Supercomputing
Also known as parallel computing or High preformance computing => Consists on the concurrent execution of different tasks by different processing units. For example:
+ *Single processor:*
    + Several cores in the same processor sharing some key units
    + Simultaneous execution of multiple basic instructions
+ *Single Computer:*
    + Integration of different processors in a single computer
    + Depending on the coupling of processors:
        + Shared memory
        + Distributed memory
+ *Local Network*
+ *Internet*

#### Shared Memory
+ All processors can access to the whole memory
+ Different latencies depending on the memory bank accessed (due to proximity)
+ Scalability up to hundreds of processors
+ High cost, high preformance in fine-grain parallelism

#### Distributed Memory
+ Each processor has only acces to its local memory block
+ Information is explicitly exchange through messages
+ Higher scalability (thousands of processors)
+ Reduced cost, worse performance in the fine-grain

## Section 2 - Parallel Computing Models

#### Flynn Taxonomy
+ **SISD** Single Instruction, Single Data (Sequential Computer)
+ **SIMD** Single Instruction, Multiple Data (Vector Computers, processors with multimedia extension)
+ **MISD** Multiple Instruction, Single Data 
+ **MIMD** Multiple Instruction, Multiple Data (Multiprocessors, multi-core)

#### Memory Architectures
+ Shared Memory - Single address space for all the processors
    + Adv: Easy Programming
    + Dis: Scalability, price
+ Distributed Memory - requires a communication network to let processors access to data outside of the local space
    + There is no global memory of concept
    + Independent processors
    + Data exchange explicitly programmed
        + Adv: Scalability, cost
        + Dis: Programming effort
+ *Hybrid Architectures* - Distributed-Shared Memory
    + Each node is a multiprocessor
    + Communiaction to move data from one node to another
    + `Super computers follow often this model`

+ Multi-Core Processors - Current tendency in the design of processors
    +  Symmetric (or not) multiprocessing in a single chip
    +  Several cache levels in the same chip
        + Adv: Cost
        + Dis: Low efficiency (badnwidth)
+ Many-Core Processors - massively parallel, with a large number of single cores
    + GPU
    + Many Cores
    + Light threads, very quick context change
        + Adv: Cost, power
        + Dis: Complex Programming

#### Interconnection Networks
**Static topologies:** ring, open 2D grid...
**Dynamic networks:** single-stage, multi-stage, crossbar
+ Uniform latency networks: low scalability (cost)
+ Non-uniform latency networks: cheaper and latency depending on the distance 

#### Clusters
Is simple a set of PCs or workstations connected in a network to execute parallel computing algorithms. Currently:
+ Rack Structure
+ A set of nodes: 2 multi-cores, 1 disk (optional GPU)
+ Network infraestructure
    + ethernet and low-latency network (infiniband, myrinet)
+ Node *front-end*

#### Shared memory model
**PRAM** - Parallel Random Access Machine
+ All processes can access to any memory position (constant time)
+ All processes execute the same code (eventually some parts may depend on the process index)
+ Information exchanged through variables

#### Distributed memory model
*p* Processors, each one with its won address space (local memory)
+ All processes share the same code (with parts depending on the process index)
+ Information is exchanged explicitly using messages
+ Local processing and communication instructions (sends/recieve through "interconnection network")

#### Parallel Programming Methodologies
+ Automatic Parallelisation 
+ Semi-Automatic Parallelisation
+ New Programming Languages
+ Extensions of conventional Languages
+ Software Libraries (API)

#### Single/Multiple Program Multiple Data
High-level programming models, suitable for any of the previous models
**SPMD:** The same program is executed in all the tasks
> SPMD programs are easy to mantain, although they may require conditional instructions

**MPMD:** Each task may have a different program


































