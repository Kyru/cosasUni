## 1. Concept of Computer Architecture

Defines the *hardware* of a computer attending to its requirements, as a desgin trade-off between performance, available technology and cost. Encompasses three levels:
+ **Instruction Set Architecture (ISA):**
    + Includes everything that must be known by assembler programmers. 
    + Description of instructions and their use, logical organization of memory...
+ **Process organization:**
    + It describes the logical elements enabling the execution of instructions: registers, decoders, ALU operations, memory interfaces... 
+ **Implementation:**
    + It defines the computer implementation: VLSI(very large scale implementation) design, cooling, power supply...

+ Before: architecture level was designed isolated by a different specialist
+ Now: Considered a transversal discipline (three levels). Focuses on the design of programmable machines that must execute a set of programs correctly and efficiently. The three levels are dependent: design decisions at one level may affect the others.

*The computer engineer task:*
+ Consider the expected requirements
+ Identify existing tech, energy and cost limitations
+ Provide the best possible design

---
## 2. Computer Requirements

In order to design a computer, an architect must consider:
+ The type of required computer (mainframes, pcs...)
+ The degree of compatibility with other existing computers
    + Source code:
        + More flexible design
        + Need of new compilers
    + Binary:
        + Existing *ISA* (lack of flexibility)
        + No new software required
+ Operating system requirements
    + Address space -> Limits, app size
    + Memory management -> Paging, segmentation...
    + Protection
    + Process management -> Multitasking support
+ Market standards:
    + Floating point -> IEEE 754
    + E/S -> SATA, SCSI, PCI Express
    + OS -> Linus, wind, Mac
    + Networks -> Ethernet, InfiniBand
    + Languages -> C, C++, Java, FORTRAN

--
## 3. Technology, power consumption and cost

Designers must take into account:
+ Available technology
+ Power and energy limitation
+ Cost 

The number of transistors per chip increases 40-55% per year. Cause:
+ Density of transistors increases by 35% per year
+ Die size increases by 10-20% every year

> Transistors grow x4 with reduction of their feature size. The speed increases linearly with the reduction of their feature size.

#### Rise of propagation delay in interconnections

Propagation delay relates to wire resistance and capacitance (R·C)
+ As feature size is reduced, wire section (width and hight) also does and so it **increases R**
+ Although capacitance of conductor surface decreases, capacitance coupling between wires (Interwinding capacitance) increases and so **increases C**

#### Power consumption and heat dissipation

![Captura de pantalla 2017-10-25 a las 19.45.55.png](resources/6ACE1151AF1E10DB17C36E97FA030380.png =581x334)

The increase in the number of transistors and frequency prevails over the reduction in voltage supply and capacitance. Implications:
+ Microprocessor power distribution. Modern microprocessors integrate hundreds of power supply pins
+ Heat dissipation and cooling
+ Development of new materials to reduce the leakage current. Dielectric improvement

#### Cost

![Captura de pantalla 2017-10-25 a las 19.54.55.png](resources/2B5B96958BBC01E41828012060998FA0.png =551x205)

Factors decreasing the cost of components:
+ **Learning curve:** The cost of a component decreases over time, since throughput increases (faulty component production rate decreases)
+ **Sales volume:** Doubling the sales volume decreases costs by 10%

Design costs:
+ Factory cost inversely proportional to *feature sizes*
+ Size of a design team is inversely proportional to *feature size* (more than 300 workers in modern processors)

---
## 4. Evolution of processor performance

Divided in 3 periods:
+ **Period I (1978 - 86)** Performance grows 25% -> technology enhacements
+ **Perido II (1986 - 03)** Performance grows 52%:
    + Technology enhancements
    + Architectural improvements: RISC (reduced intruction set computer) architecture, pipelining, instuction level paralellism


























