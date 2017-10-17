### Structured Methods 

Structured diagram -> A system is partitioned in modules that invoque or provide service to other modules, possibly with data passing in both directions.

**Module:** Part of the program that implements part of the functionality
**Characteristics:** 
  + White/Black box
  + Encapsulation

A module may be decomposed in terms of other modules of a lower level

#### Object Oriented Architectures

Classes as decomposition units => Structure + behaviour in a module
The class structure of the architecture is propagated to the code

#### Problems 
+ Approaches based on modules and objects are low level ones
+ They do not divide the application in terms of functional blocks; they are mere groupings of code
+ A more abstract mechanism is necessary to clearly detect the aspects that are present in most software system

#### Software Architecture is important
+ Software Architecture must be organized in terms of subsystems
+ Developed by means of architectonic patterns

We will work with ***Distributed systems*** 
> A software system which information processing is distributed among different computing nodes.

Inside Distributed Systems we'll use ***Client/Server Architecures*** 

> The System is seen as a set of services that are provided to client applications by server applications. Client and server applications are handled separetly

---

Always a two step interaction:
+ Server is service provided 
+ Client is a consumer of services

They interact by means of message passing mechanism:
+ Services request
+ Answer

#### Multi-layer Architecture

> A layered sustem is a sorted set of subsystems each one defined in terms of the ones located *below* them and providing the implementation base of the systems above

The objects in each layer are usually independent (recommended)
There is a relationship *client/server* between the lower layers (providing service) and the upper layers (using those services)

Layered architectures may be open or closed depending on the dependencies between layers
+ Open: A layer may use characteristics of any layer
+ Close: A layer may only use characteristics of its adjacent lower layer *(recomended)*

2-Layer Architecure: Thin clients => Data intensive applications with little processing

> ***Layer*** refer to logical segmentation of the solution whereas ***tier*** refers to a physical segmentation or location

#### 3-Layered Architecture
**Advantages:**
+ Business logic isolated from presentation and persistence in a separate component
+ Distribution of layers in different machines or processes
+ Possible parallel development
+ Asigning resources to each layer
+ Software Reuse *(important)*
































