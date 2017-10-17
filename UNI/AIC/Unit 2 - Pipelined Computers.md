## Unit 2.1 - Pipelined instruction unit
#### 1 - Concept of pipelining
+ A process is decomposed in several subprocesses
+ Each subprocess is independently executed in an autonomous module
+ Each module works concurrently with the rest

![Captura de pantalla 2017-10-03 a las 8.43.00.png](resources/02A086149C1020DA06AFFEA4A28BB7BC.png =462x238)

**Latches:** They keep data stable during the time required by a module to cope with its function. The make design independent from:
+ Different delays among modules
+ Different delays among the various lines of a module

A clock synchronizes the advance of data among stages. The clock defines:
+ When new data can go into the pipelined unit
+ The time available fot stages to cope with their goal

**Clock period (ideal case)**: same delay in all modules

t = D/K  (D is the original circuit delay) 
