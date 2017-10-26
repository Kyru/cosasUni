## Section 1 - Shared Memory Model
#### Concurrent processes
They are typically defined using *fork-join-like* constructions
+ ***Fork*** creates a new concurrent task that starts its execution in the same point where the initiator task made the fork
+ ***Join*** waits for the task to finish

This schema can be implemented at the level of:
+ OS processes (*heavy processes*)
+ Threads (*light processes*)

#### Shared Memory Model
+ Tasks share a common memory space
+ Programming quite similar to sequential case
    + There are no task "private" data
    + We do not need to exchange data explicitly
+ Inconvenients
+ Memory access need to be coordinated
    + Locks, monitors...
    + Unpredictable results if data access is not properly protected
+ Data locality is difficult to control

#### Thread model
This model is coupled to shared memory architectures
***thread:*** Independent instruction flow that can be scheduled by the OS
+ A process may have multiple concurrent execution threads
+ Each thread has local data
+ Threads share resources/memory of the process
+ Synchronization is needed

#### Java Threads

```java
// Object-oriented model

public class HelloThread extends Thread {
  public void run() {
    System.out.print("Hello from a thread!");
  }
  public static void main(String args[]) {
    (new HelloThread()).start();
  }
}

// Synchronized methods

public class SynchronizedCounter {
  private int c = 0;
  publid synchronized void increment() {
    c++;
  } 
  public synchronized int value() {
    return c;
  }
}
```
#### POSIX threads (pthreads)
Some operations:
+ Creations: pthread\_create, pthread_join
+ Locking: sem\_wait, sem_post
+ Mutual exclusion: mutex\_lock, mutex_unlock
+ Condition variables: pthread\_cond_ wait, pthread\_cond\_signal, pthread\_cond_broadcast

Drawbacks:
+ Portability (windows uses another system)
+ Task-oriented parallelism, rather than data-oriented parallelism

#### OpenMP
Standarization of threads
+ Based on compiler directives
+ Available in C/C++ and Fortran
+ Portable/multi-plataform
+ Easy to use: incremental parallelisation
+ Sequential code can be preserved

*Some directives and functions:*
+ `pragma omp parallel for`
+ `omp_get_thread_num()`

> Creation and termination of threads is implicit in some directives (no need of calling fork/join)

#### Unix processes
Each process comprises information about resources and its execution status
+ Program code (read-only, can be shared)
+ Variables (global, heap and stack)
+ Execution context: registres, stack pointer, etc...
+ System resources (only accessible through the OS)
    + Identifiers 
    + Environment, work directory, signals
    + File descriptors
+ In multi-threaded processes
    + Each thread has its own execution context
    + Each thread has its own independent stack 
    + System resources are shared

#### Threaded-memory model
Simple model: Single address memory space
More realistic model: unique space of addresses with private variables for each thread

![Captura de pantalla 2017-10-02 a las 15.36.34.png](resources/59469D0F4608CB485F95D40AAED3C3B8.png =401x173)

Each thread has its own stack
+ Some variables are created in the stack (local variables)
+ A thread cannot know if a stack from other thread is active

#### Memory Access Coordination

The exchange of information among threads is performed by reading and writing on variables in the shared memory space
> Simultaneous access can produce a race condition (final result could be incorrect)

#### Mutual Exclusion and Synchronization
How race conditions can be addressed?
*Atomic operations*
+ Force problematic operations to be performed atomically (without being interrupted)
+ Special instructions of the processor: test-and-set or compare-and-set

*Critical sections*
+ Code fragments with more than one instruction
+ Only one thread can execute the section simultaneously
+ It requires *synchronization* mechanisms: semaphores
+ Risk of dead-locks

*Event-based synchronization*
+ Barriers: all threads wait in the barrier for the last one to arrive
+ Ordered execution and others

## Section 2 - Fundamentals of Parallel Algorithm Design
#### Parallelization of Algorithms
Paralellizing an algorithm implies finding *concurrent tasks* (parts of the algorithm that can be run in parallel)
> A task can only start when another one has finished

#### Data dependencies
It is possible to determine if there exist dependencies between two tasks form the I/O data of each task

![Captura de pantalla 2017-09-26 a las 12.13.16.png](resources/3CF9A6B2C96971B2283EAC4294665F76.png =448x141)
Dependency types:
+ Flow dependencies (condition 1 not fulfilled)
+ Anti-dependecy (condition 2 is not fulfilled)
+ Output dependency (condition 3 is not fulfilled)

```c++
// Flow dependency
double a = 3, b = 5, c, d;
c = T1(a,b);
d = T2(a, b, c);

/* T2 cannot start until T1 ends */

// Anti-dependency
double a[10],b[10],c[10],y;
T1(a,b,&y);
T2(b,c,a);

/* T2 cannot start until T1 ends, otherwise T2 would overwrite the contents of a that is input to T1 */

// Output dependecy
double a[10],b[10],c[10],x[5];
T1(a,b,x);
T2(c,b,x);

/* Both tasks modify array x */
```
#### Design of Parallel Algorithms: General Idea

Basically 2 phases:
1. Task decompostion
    + Requires a detailed analysis of the problem => Task Dependecy Graph
2. Task assignment
    + Which thread/process executes each task
    + Often implies agglomeration of several tasks
     
Usually there are several possible parallelization strategies
+ Use one decomposition or another may have a great impact on performance
+ We must try to maximize the ***degree of concurrency***

#### Task Dependecy Graphs

TDGs are an abstraction used to express the dependencies among the tasks and their relative execution order.
+ It can be represented by using a Directed Acyclic Graph (DAG)
+ Nodes denotes the tasks (may have an associated cost)
+ Edges define the dependencies among tasks

*Definitions*
+ Length of a path: sum of the costs *c<sub>i</sub>* of each node contained in the path
+ Critical path: longest path between the starting and final nodes
+ Maximum *concurrency degree*: Larger number of tasks that can be concurrently executed
+ Average concurrency degree: $M = \sum_{N}^{i = 1} C_{i}/L  $
    + N = total nodes, L = length of the critical path

![Captura de pantalla 2017-10-02 a las 16.21.57.png](resources/15419085E5E416E81D5766B532F541FE.png =462x348)

![Captura de pantalla 2017-10-02 a las 16.28.43.png](resources/7611309406D82D9D5B423A1AEB7F684A.png =461x354)

> Sometimes the graph incorporates information related to *communication*

## Section 3 - Performance Evaluation
#### Performance Evaluation
The main objective of parallel computing is to increase performance.
+ It is very important to know how the different parts of a parallel program behave
+ It is also imporatant to know how they will behave when the number of processors and the size of the program change

#### Analysis types
*A priori* Analysis:
+ It is performed on the pseudocode and the program desgin, before the implementation of a program
+ Independent of the machine where it is executed
+ It enables identifying the best approach to implement a parallel program
+ It enable the determination of the best size of the problem and the features of the hardware used

*A posteriori* Analysis:
+ It is performed on a specific implementation and machine, and using a defined of input data
+ It enables analysing bottlenecks and detecting unpredicted conditions during the design

#### Theoretical Analysis
The cost is analyzed depending on the problem size: n
In many cases the cost depends only on *n: t(n)*
However, sometimes given the same problem size, different behaviour may be observed depending on the input data
+ Cost of the most favourable case
+ Cost of the less favourable case
+ Average case (reasonable when the cost only depends on the problem size)

> In practical terms, asymptotic values are defined (inferior and superior)

#### Concept of a FLOP
FLOP - Floating Point Operation => measurement unit for:
+ Cost of algorithms
+ Performance of computers (flop/s)

1 flop = cost of an elemental floating point operation (product, sum, division, subtraction)
+ The cost of the elemental integer operations are neglectable
+ The cost of other operations in floating point are evaluated depending on the FLOP unit

> The flop represents a machine-independent cost measurement unit

#### Asymptotic Notation

+ O Notation:
    + It defines an upper bound, except for constants and asintotically the shape of the function growin
    + In practical terms it is the highest order term of the cost expression without considering its coefficient
    
+ o notation:
    + It also considers the coefficient of the highest-order term
    + Useful when comparing two algorithms which has the same order O

#### Parameters to evaluate the performance

**Absolute** parameters:
+ They enable knowing the real cost of parallel algorithms
+ They are the basis for the computation of relative parameters that are used to compare algorithms
+ They are the most important ones for real-time problems

**Relative** parameters:
+ They enable comparing parallel algorithms among them and with respect to the sequential implementations
+ They provide information about the rate of usage of processors

#### Absolute Parameters
+ Execution time of a sequential algorithm: t(n)
+ Execution time of a parallel  algorithm: t(n,p)
    + Arithmetic time: ta(n,p)
    + Communication time: tc(n,p)
+ Total cost: C(n,p)
+ *Overhead:* to(n,p)

*Notation*
+ When the problem size is always n, we can avoid the n => t(p)
+ Subindices instead of functions => Tp, Cp

#### Execution time 
Time spent in the execution by the sequential algorithm (using only one processor, t(n)) or by the parallel algorithm (in p processors, t(n,p))
+ It only takes into account the number of floating point operations
+ A priori cost is measured in FLOPs
+ Experimentally the cost will be measured in seconds

![Captura de pantalla 2017-10-22 a las 11.20.46.png](resources/1BC45570AF1309851EA3BFE9D3310C5C.png =641x474)

#### Total cost and Overhead

The execution of a parallel algorithm normally implies an extra time with respect to the sequential algorithm
The parallel ***total cost*** accounts for the total time empoyed by a parallel algorithm.
`C(n,p) = p.t(n,p)`
The ***overhead*** indicates which is the added cost with respect to the sequential algorithm
`to(n,p) = C(n,p) - t(n)`

#### Speed-up and Efficiency
The **Speed-up** denotes the speed gaining of a parallel algorithm with respect its sequential version
`S(n,p) = t(n)/t(n,p)`
The reference time t(n) could be: 
+ The best sequential algorithm at our knowledge
+ The parallel algorithm using 1 processor

The **efficiency** measures the degree of usage of the parallel units by an algorithm
`E(n,p) = S(n,p)/p`
It is normally expressed as a percentage (either in the frame 0-100% or 0-1)

![Captura de pantalla 2017-10-22 a las 11.53.27.png](resources/644778416B497CE82294633376EA0F9E.png =610x410)

In this case, p=2 and p=3 would give the same speedup, but not the same efficiency. In p=2 processes will be group in pairs. In p=3 in two groups, where T4 which is the leftout would be asigned to the first finishing thread. In p=3 the efficiency will be much lower because threads will have to wait until T1, T2, T3 and T4 end.

#### How to obtain good performance

Ideally we look for p processors with a speedup of p (efficiency is 1). To achieve this:
+ Appropriate **parallelization design:**
    + Well balance load distribution
    + Minimize time in which processors are idle
    + Minimum possible overhead
+ Specify aspects of the **architecture where it runs**
    + Different in shared memory of message passing
    + **Data access time** is not considered in the theoretical cost analysis, but it is very important in current architectures

![Captura de pantalla 2017-10-22 a las 12.10.22.png](resources/0BACF1875520099A02BBF8ACE4874FBE.png =607x485)

## Section 4 - Algorithm Design: Task Decomposition
#### Parallel Algorithms Design

Parallel algorithms have a higher design complexity than sequential ones
+ Concurrency (communication and synchronixation)
+ Data and code allocation to processors
+ Concurrent access to shared data
+ Scalability for an increasing number of processors

#### Task decomposition
> **Task** each one of the computation units defined by the programmer which can be potentially be executed in parallel

The process of spliting computations in task is called **decomposition**

Granularity:
+ The decomposition can be *fine-grained* or *coarse-grained*
+ Usually a fine grain decomposition is performed by then concurrent operations are grouped into coarser tasks

#### Domain Decomposition techniques
+ Data are split in chunks of similar size (sub-domains)
+ A task is assigned to each domain, which will perform the needed operations on the sub-domain's data
+ Typically used when all sub-domains data require the same set of operations
+ These techniques are classified in:
    + Output data centred decompositions
    + Input data centred decompositions
    + Block-oriented decompositions (matrix algorithms)

![Captura de pantalla 2017-10-22 a las 13.07.40.png](resources/8B7C66D79B7F981DF0A57BC29EFC96F7.png =621x463)

![Captura de pantalla 2017-10-22 a las 13.09.31.png](resources/3794A1A1197DCD6B930B65BA5BE35960.png =639x455)

#### Functional decomposition directed by the data flow
+ It is used when a problem can be split into phases
+ Each phase executes a different algorithm
+ Typically, it involves the next steps:
    1. Different phases are identified
    2. A task is assigned to each phase
    3. Data requirements for each task is analysed

## Section 5 - Algorithmic Schemes (I)
#### Algorithmic Schemes

They are used parallelization approaches:
+ A schema is used to solve a wide range of problems
+ A problem may require several schemes

Some schemes:
+ Data parallelism/partitioning
+ Task parallelsim (master-slave, process farm, replicated workers)
+ Tree and graph based schemes (divide and conquer)
+ Synchronous Parallelism
+ *(pipelinning)*

#### Divide and Conquer

A method to obtain concurrency in problems that can be solved using the *divide and conquer* technique
1. Divide the original problem in two or more subproblems
2. In turn these subproblems are divided in two or more subproblems, and so until the base case is reached
3. Obtained data are appropriately combined to obtain the final result

Several types of tasks:
+ **Dividing** the problem: it is performed in the inner nodes to create child nodes
+ **Solving** the base case: only in the leaves of the tree
+ **Combining** the result: performed in the inner nodes, they collapse the associated sub-tree

Example:
+ *Quicksort* -> splitting stage has the largest cost
+ *Merge-sort* -> focuses work on combination
























































