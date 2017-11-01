## 1. Performance definition

+ User -> Finish as soon as possible -> **lower** Execution time (time to complete task)
+ System manager -> Complete many tasks as possible -> **higher** throughput (operations completed per time unit)

Relationship:  $Throughput = \frac{1}{Execution time}$

#### Comparison

+ When two computers (X and Y) are compared, the slowest one Y is taken as reference
+ When a set of designs (X<sub>1</sub>, ..., X<sub>n</sub>) is studied, a computer Y (in the set or not) is selected as reference

In order, to compare computers you need to achieve similar execution conditions, so you can use:
+ Execution time: Tx and Ty
+ Throughput: Px and Py

![Captura de pantalla 2017-10-26 a las 15.34.12.png](resources/2F581CDD79729BB88EA5F10739C9C547.png =552x192)

---
## 1.2 Quantitive Principlies of Computer Design

![Captura de pantalla 2017-10-26 a las 15.36.20.png](resources/C4BECD9A8166EDAA78533B285BC3883B.png =585x243)

For example: A more complex computer organization can reduce CPI, but can increase the number of logic gates traversed per cycle, thus increasing T.

#### Amdahl's law

![Captura de pantalla 2017-10-26 a las 15.38.45.png](resources/2C1C297704EE36E988E380A9F761C48E.png =576x295)
![Captura de pantalla 2017-10-26 a las 15.39.29.png](resources/27DFE6EC77EE3BA2A7A26E6FF3266668.png =566x280)
 ![Captura de pantalla 2017-10-26 a las 15.41.38.png](resources/996658AD2F2AC41C5EA2AA6C14836EED.png =583x307)
 
Examples:
+ In programming:
    + *Locality principle:* 90% of the time, the computer executes 10% of the code
    + Convenient to optimize the most frequently executed code
+ Instruction set designs: 
    + Most executed instructions
+ Multiprocessor systems:
    + Which fraction can be parallelised


> In general, Amdahl's law applies to the design of the various parts of a computer

#### Relation between Cost and Performance

![Captura de pantalla 2017-10-26 a las 19.19.16.png](resources/E32972E04D397FA1CB029178C1668ECD.png =483x234)

---
## 3. Measuring Performance

Performance is measured with a program or a collection of programs that are likely relevant to the user. **Real programs** are the best option. But we can opt for alternatives:
+ *Kernels:* Fragments of code extracted from real programs
+ *Toy benchmarks:* Simple programs with well-known execution results
+ *Synthetic benchmarks:* Programs written in order to represent the average program typically run in a system

#### Benchmarks suites
+ Components: Kernels and real non-interactive programs defined to measure performance attending to a given user profile
+ Updating: *At any moment* the type of tasks typically run in the system by a regular user
+ Reproducibility: Measures must be reproducible. Hardware & Software clearly defined

#### Comparison of computers

![Captura de pantalla 2017-10-26 a las 19.29.42.png](resources/A6FE506FF264A8274EF1E2D9F6E55CC9.png =495x220)
![Captura de pantalla 2017-10-26 a las 19.30.24.png](resources/96CA28CC21A17D1BDA8AA03FCB7E5CC2.png =565x323)

---
## 4. Other performance metrics

**MIPS:** (millions of instructions per second)

![Captura de pantalla 2017-10-26 a las 19.35.30.png](resources/D5C1DDD1EC9D83D4E028690086567250.png =504x131)

+ Intuitive measure proportional to performance
+ Does not account for the number of executed instructions
+ Depends on considered programs
    + Different programs -> different instructions (complexity and execution time) 
+ Depends on instruction set
    + Same program -> different number of instructions (according to the complexity of instruction set)
+ May be inversely proportional to performance
    + Two computers, one with and one without floating point co-processor:
        + Performance -> **With** Co-processor
        + MIPS -> **Without** Co-processor

![Captura de pantalla 2017-10-26 a las 19.40.51.png](resources/874DC2AC32F47C6C3D40878F248D5F07.png =583x247)

**MFLOPS:** (millions of floating point operations per second)

![Captura de pantalla 2017-10-26 a las 19.46.53.png](resources/07F6ABAB03997CC3A30FAB30FA30EFE4.png =532x83)

+ Operations instead of instructions:
    + Same program -> different architecutres -> different number of instructions, but same number of FP operations
+ Can't be applied to programs that are not carrying out any FP operations (compilers)
+ Depends on FP instruction set of each computer -> which is not always the same
    + Solution: Rely on *source code* operations
+ Different programs execute different FP ops and they usually have different costs




























