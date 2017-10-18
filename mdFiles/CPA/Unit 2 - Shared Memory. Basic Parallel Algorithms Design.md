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



























































