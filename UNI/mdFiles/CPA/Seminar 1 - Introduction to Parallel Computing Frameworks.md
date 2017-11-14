## Section 1 - Programming in C
*Variables and Basic Types*
+ Integer: char, int, long
+ Enumerated: enum
+ Floating point: float, double
+ Void Type: void
+ Derived Type: struct, array, pointers
+ typedef - to define new types

*Sentences* 
+ Declaration of types and variables
+ Expression, typically asignment
+ Composed sentence ({...} block)
+ Conditions (if, switch)
+ Loops (for, while, do)
+ Others: void sentences, jump (goto)

*Expressions*
+ Assignations: =, +=, -=, *=, /=
+ Increments: ++, --
+ Arithmetic: +, -, *, /, %
+ Bit-wise: ˜, &, |, ˆ, <<, >>
+ Logic: ==, !=, <, >, <=, >=, ||, &&, !
+ Ternary operator: a ? b: c

#### Arrays
*Array:* collection of variables of the same type
+ Length defined in declaration
+ Elements accessed by an index

*Multidimensional arrays:* `matrix[N][M]`
> Strings are arrays of type char ending with the character '\0' 

#### Pointers
Pointer: Variable containing the memory addess of other variable or value
+ In the declaration, * is added before the name of the variable
+ Operator & returns the address of a variable
+ Operator * enables accessing the value pointed to

Arithmetics:
+ Basic operations: +, -, ++
+ The increment/decrement is proportional to the pointed type size



```c++
p = &v[0];    // p = v
*p = 4;       // v[0] = 4
v[1] = *p++   // v[0] = 5
              // v[1] = 4

// no es lo mismo que:
v[1] = *++p   // v[0] = 5
              // v[1] = 5

/* Si hacemos el *p++, p se actualiza despues de haber añadido el puntero. En cambio en *++p actualizas p y luego usas eso como nuevo contenido del puntero
```
*NULL pointer*
+ It values zero
+ It is an invalid pointer normally used to indicate a failure

*Generic Pointer*
+ Type: void*
+ It can be casted to point to a variable of any type

#### Structs
Structs: a collection of heterogenous data
+ Members can be accessed with . (or -> in the case of struct pointers)

#### Functions
*reminder:*
+ A C program has at least one function (main)
+ Functions return a value (unless void)
+ The arguments of a function receive the values indicated in the call

***Software Library functions***
+ String processing <string.h>
    + String copy (strcpy), string compare (strcmp)
    + Memory copy (memcpy), memory set (memset)
+ I/O <stdio.h>
    + Standard: printf, scanf
    + Files: fopen, fclose, fprintf, fscanf
+ Standard tools <stdlib.h>
    + Dynamic memory management: malloc, free
    + Conversions: atof, atoi
+ Math functions <math.h>
    + Functions and Operators: sin, cos, exp, log, pow, sqrt
    + Rounding: floor, ceil, fabs

#### Variable Types
Global variables:
+ They can be declared outside any function block
+ They can be accessed from any point of the program
+ They are allocated in the data segment

Local Variables:
+ They are declared inside a function block
+ They are only accessible by the sentences of the function block
+ They are created in the (stack), and destroyed when leaving the function

Static variables:
+ Modifier static
+ Local scope but persistent between successive calls

Dynamic memory: 
+ Variables pointing to memory allocated with malloc, persist until free function is called
+ They are created in the *heap*

#### Stack
When entering a function:
1. all arguments are inserted in the stack
2. the return address is stacked also
3. local variables are created in the stack

When executing *return* or leaving the function, the whole context created is destroyed

## Section 2 - Usage of Parallel Computers

#### Development Cycle
Consists of:
+ *Preprocessing:* The C source is modified according to a set of instructions 
+ *Compiling:* The object code (binary) is created from the already preprocessed code
+ *Linking:* It merges the object codes from different modules and external libraries to generate the final executable

#### Preprocessing
+ include: It inserts the content from other file
+ define: It defines constants and macro-expressions (including arguments)
+ id, ifdef: enables skiping part of the code during the compliation
+ pragma: compiler directive

#### Compiling and Linking
Compiling: cc
+ For each *.c file, a *.o object file is generated
+ It comprises the machine code of the functions and variables, as well as a list of unsolved symbols

Linking: ld
+ It solves all the unsolved dependencies using the \*.o files and external software libraries (*.a, *.so)

#### Parallel program compilation
OpenMP is based on directives #pragma omp
+ A compiler without OpenMP support ignores these directives
+ Modern compilers have these support, provided that a special option is included in the compilation and linkage

MPI provides the mpicc command
+ Invokes cc adding all necessary options for MPI codes
+ Eases the compilation in different computers and environments
+ mpicc -show shows the options available

#### Parallel computing: Front-End
The *front-end* enables users to interact with the cluster
Used for routine tasks:
+ Editing and compiling programs
+ Short test runs

Useful commands:
+ Files/directories: cd, pwd, ls, cp, mkdir, rm, mv, scp, less, cat, chmod, find
+ Processes: w, kill, ps, top
+ Editors and others: vim, emacs, pico, man

#### Running parallel programs
**OpenMP:** Executables can be run directly (usually the number of threads should be indicated)
**MPI:** use mpiexec (or mpirun) commands
+ Options: choose hosts, architecture
+ MPMD mode

#### Wueue system
The **Queue system** (or job scheduler or resource manager) is a software that enables sharing a cluster among different users
+ The user can run "jobs" usually in batch mode (non-interactive) using one or several nodes
+ A job is a particular execution with a set of attributes (nodes, max execution time)
+ Job scheduling policies are defined
+ The system accounts the resources used
+ Objective: Maximize usage and minimize waiting time

Working procedure:
1. A job is defined and then submitted to a queue, which returns an identifier
2. Depending on the workload, after a waiting time the job is run
3. The output is obtained when the job finishes






























