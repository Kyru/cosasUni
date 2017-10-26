## Section 1 - Basic Concepts
#### Programming model

OpenMP programming is mainly based on: **compiler directives**
Advantages:
+ It eases the adaptation
+ It enables incremental parallelisation
+ It enables compiler-based optimization

OpenMP execution models follow the *fork-join* schema

#### Execution model

![Captura de pantalla 2017-10-23 a las 18.04.55.png](resources/DB20525422554587E619B33916F8D2C2.png =497x189)

Directives define *parallel regions*
Other directives/clauses:
+ Type of variable: private, shared, reduction
+ Synchronization: critical, barrier

#### Execution model - Threads

![Captura de pantalla 2017-10-23 a las 18.06.20.png](resources/112A751E17146648305657EAB24EE2CC.png =511x395)

#### Syntax:

![Captura de pantalla 2017-10-23 a las 18.08.41.png](resources/51AE7D11FAABEA9F7BB2CD352F6D6FB5.png =500x351)

#### Simple Example

![Captura de pantalla 2017-10-23 a las 18.10.10.png](resources/B80C0B9B242433BC878D1F0FF0506713.png =560x213)

+ When the execution reaches the directive *parallel*, threads are created (if they have not been created previously)
+ Loop iterations are split among the threads
+ Be default, all the variables are shared, except for loop iteration variable (i in this case) which is always private
+ At the end, all threads are synchronized

#### Number and Identifires of Thread

The number of threads can be explicitly defined:
+ Using the clause `num_threads`
+ Using the function `omp_set_num_threads()` *before* the parallel region
+ In the execution time, with `OMP_NUM_THREADS`

Useful functions:
+ `omp_get_num_threads()` -> returns number of threads
+ `omp_get_thread_num()` -> returns thread identifier (main thread is 0)

Example:

![Captura de pantalla 2017-10-23 a las 18.15.08.png](resources/49063C08CD35515573C4541B90E61B0D.png =528x157)

## Section 2 - Loop Parallelisation
#### Directive parallel for

When including `#pragma omp parallel for ...` the next loop is parallelised

Example: 

![Captura de pantalla 2017-10-23 a las 18.18.22.png](resources/3DB188CD35FA4AFBF6CD53AAED96BFBC.png =550x372)

#### Variable types

Classified according to their *scope:*
+ **Private:** each thread has a different replica
+ **Shared:** all threads can read and write

The scope can be modified with clauses added to the directives:
+ private, shared
+ reduction
+ firstprivate, lastprivate

#### Private, Shared

> If the scope of a variable is not defined, by default it is shared

Exceptions for this:
+ Index variable of the parallelised loop
+ Local variables of the called subroutines, (except if declared as static)
+ Automaitc variables declared inside the loop

> Using `default(none)` forces to specify the scope of all variables

![Captura de pantalla 2017-10-23 a las 18.24.48.png](resources/3A3176D08682C5C3AB872F0074948F6B.png =547x395)

In this example, none of them work, so we have to use reduction

#### Reduction

![Captura de pantalla 2017-10-23 a las 18.29.54.png](resources/2FC089DC2001D0A69CD49EADE206183C.png =534x167)

Each thread performs a part of the sum, and all parts are combined at the end in the total sum. Works as a correctly initialized private variable.

It can be used with: +, *, -, &, |, ˆ, &&, ||, max, min

#### Firstprivate, Lastprivate

When created, private variables do not have an initial value and after the completion of the parallel block, its value is undefined.
+ `firsprivate`: Sets up as initial value the value of the main thread at the beginning of the block
+ `lastprivate`: The value of the variable after the block is the one of the "last" iteration of the loop

![Captura de pantalla 2017-10-23 a las 18.43.23.png](resources/9A0013468CB64F4403266E32A207D8F6.png =542x183)

#### Guarantee enough computing load

Loop parallelisation introduces an *overhead*: Creation and termination of threads, synchronization.

We use the if clause to avoid this ->

![Captura de pantalla 2017-10-23 a las 18.45.44.png](resources/B9D2CBC6BAF75B8043E718C6F969A977.png =537x125)

If the expression is false, the loop is executed sequentially

#### Nested loops

![Captura de pantalla 2017-10-23 a las 18.47.17.png](resources/68511092D730402FC11766361496BE5E.png =565x379)

#### Nested loops - exchange

The best performance is normally obtained when parallelising the external loop. When data dependencies prevent from parallelising the external loop, **loop exchange** may be convenient. 

**Loop exchange:** Is basically change the order of the loops

![Captura de pantalla 2017-10-23 a las 18.53.57.png](resources/771C7E9363022C35FD3A07DADE85A9D9.png =546x275)

#### Scheduling

Ideally, all iterations cost the same and each thread has approx. the same number of iterations. In reality however, a *workload unbalance* may appear, therefore reducing performance.

With OpenMP we can select the best *scheduling:*
+ Static: iterations are assigned to threads at coding time
+ Dynamic: assignment of iterations to threads progressively adapts to the current execution

> The scheduling considers contiguos ranges of iterations

#### Scheduling - schedule Clause

Syntax: `schedule(type[, chunk]`

Types:
+ *static* (without chunk): Each thread receives an iteration range of similar size.
+ *static* (with chunk): cyclic (round-robin) assignment of ranges of size chunk
+ *dynamic* (chunk optional, 1 by default): ranges are being assigned as required first-come, first-served)
+ *guided* (chunk minimum size optional): same as *dynamic* but the size of the iteration range decreases exponentially (∝ nrest/nthreads) with the loop progress.
+ *runtime* the scheduling is defined by the values of the environment variable `OMP_SCHEDULE`

Example:

![Captura de pantalla 2017-10-23 a las 19.06.21.png](resources/7011CED420F53D3012F87DB69488413E.png =544x334)

## Section 3 - Parallel Regions
#### Workload splitting

> Remember that some of the accepted clauses are: private, shared, default, reduction, if...

Along with the replicated execution, splitting the work among the threads is also needed often. 
+ Each thread can work on a part of the data structure
+ Each thread can perform a different operation+

Possible mechanisms for the workload splitting:
+ Queue of parallel tasks
+ According to the thread identifier 
+ Using OpenMP specific constructions

#### Splitting according to thread identifier

![Captura de pantalla 2017-10-23 a las 19.32.14.png](resources/0EFE5D1DFD2941422041AC49C96D1E5B.png =531x167)

#### Splitting using a queue of parallel tasks

A queue of parallel tasks is a data structure shared among the threads that store a list of "tasks" to be performed.
+ Tasks can be processed concurrently
+ Any task can be run by any thread

![Captura de pantalla 2017-10-23 a las 19.44.22.png](resources/E8E34EF7E63C823A02154B61B0B5CDF1.png =361x296)

#### Work splitting constructions

OpenMP has specific constructions (work-sharing constructs)
Three types:
+ `for` construct to split iterations of loops
+ Sections to distinguise different parts of the code
+ Code to be executed by a single thread+

Implicit barrier at the end of the block

#### for construction

![Captura de pantalla 2017-10-23 a las 19.51.38.png](resources/CC28DA212FA8DBF8D668A2D5AA03ACE1.png =535x191)

> The loop iterations are not replicated but *shared* among the threads

#### Loop construction - Clause nowait

When several independent loops take place  int the same parallel region, nowait removes the implicit barrier at the end of the loop.

![Captura de pantalla 2017-10-23 a las 19.57.07.png](resources/CADB08FBF547DBEC20D0ECAA3D4A928F.png =529x330)

#### Sections Construction

Suitable for independent but difficult for parallelizing code blocks
+ Individual workload is reduced
+ Each fragment is essentially sequential

(they can be combined with `parallel`)
(one thread can execute more than one section)

![Captura de pantalla 2017-10-23 a las 20.04.02.png](resources/81B1618E8320B0A64EC611AB31154AC1.png =533x229)

#### single Construction

Code fragments that can be executed by a single thread

![Captura de pantalla 2017-10-23 a las 20.26.41.png](resources/3569EE0301B574CDC6FCC23D8EAD4AFE.png =539x311)

## Section 4 - Synchronization
#### Mutual exclusion

*Mutual exclusion* when accessing shared variables prevents any race condition

OpenMP provides three different constructions:
+ Critical sections: `critical` directive
+ Atomic Operations: `atomic` directive
+ Locks: *_lock routines

![Captura de pantalla 2017-10-23 a las 20.36.46.png](resources/FAC902437F3C1A53A7C58F86B28A465D.png =570x441)

![Captura de pantalla 2017-10-23 a las 20.37.59.png](resources/DF7251756AD0376F9D73F8EC49906261.png =565x438)

![Captura de pantalla 2017-10-23 a las 20.42.14.png](resources/361C4641CCE020684F2D2BC8462DF2FE.png =568x430)

#### Atomic directive

![Captura de pantalla 2017-10-23 a las 20.50.38.png](resources/E1CAC9384924B5066DB23AE1F9CA46A3.png =562x397)

#### Event-based synchronization

Mutual exclusion constructions provide exclusive access but they do not impose an execution order in the critical sections. 
*Event-based synchronization* enables defining the order of the execution of the loop iterations. For example:
+ Barriers: barrier directive
+ Ordered sections: ordered directive
+ master directive

#### Barrier directive

![Captura de pantalla 2017-10-23 a las 20.59.58.png](resources/0AFEA2B21121BE960A2B923922F90118.png =546x404)

#### Ordered directive

![Captura de pantalla 2017-10-23 a las 21.00.16.png](resources/9CE582AE8EC1B6B7F611A0A379DA78AE.png =555x383)

#### Master directive

![Captura de pantalla 2017-10-23 a las 21.01.23.png](resources/4CA5FEDF28BEF9DB0E54FF7E4D2E95BB.png =548x387)




























