# UNIT 9: DISTRIBUTED ALGORITHMS

### Distributed Algorithms Re-cap:

+ Independent of specific technologies
+ Features of decentralized distributed algorithms:
  + No node maintains all complete information required by the algorithm
  + Nodes only take decisions based on their local knowledge
  + The failure of one node does not prevent the algorithm to progress
  + No global physical clock is assumed

## Clocks

#### Difficulties in temporal synchronization

+ Synchronization provides mechanisms for coordinating activities.
+ It is _more complex_ in distributed systems than in centralized ones (eg: access to shared resources)
  + Centralized: Usual way to synchronize is using a single global clock
  + Distributed: Each computer has its own clock
+ To employ a single clock in distributed systems: we need to synchronize clocks of the different nodes to have a common clock

#### Clock synchronization algorithm

* Each node _i_ has a local clock _Ci_ 
  * It represents a universal temporal coordinated (UTC) value
* Given any real instant _t_ 
  * The goal is that all nodes have _Ci(t) = t_ 
  * This means that all local clocks have the same time, and this time must be the same as the "exact true right" time
* Unfortunately, clock chips in which _Ci_ clocks are based are not this precise
  * They normally have a relative error of  $10^{-6}$ 
  * Therefore, _Ci(t)_ is more and more different from t
* The solution is to periodically synchronize clocks of all nodes using some reliable time source

#### Cristian Algorithm 

Cristian Algorithm synchronizes the local clock **Cc** of a **client computer** with the local clock **Cs** of a **server computer** 

**Considerations:** 

+ The server computer has a very precise clock, possibly synchronized with others that are still more precise
+ Clocks must no go back
+ Synchronization implies message transmission, but transmission of messages through the network takes time

##### Algorithm: 

+ The algorithm asks the value of the clock to the server at instant T0 (client local clock Cc)
+ The server receives the request and answers with the value of its own clock: Cs
+ The answer arrives to the client at T1 (Cc)
+ The client sets its clock to the value **C = Cs + (T1 - T0)/2** 
  + If C > Cc => Cc = C
  + If C < Cc => The client stops Cc the next Cc-C units of time 
    + Stores LAG = Cc - C and several clock ticks are discarded until LAG time has been elapsed

__**Features:**__  

It assumes that the sending time of both messages (request and answer) is practically the same

+ In _t1_ the value of Cs will have been incremented in (T1 - T2)/2 

If one of the two messages takes more time to be transmitted, then this adjustment is not right and so normally, the duration of both messages is the same. 

The right 	behavior of a distributed application can be dependent on the values of local clocks only if it can tolerate the error margin inherent to the synchronization algorithm applied.

#### Berkeley Algorithm

**Features:** 

+ There is a set of nodes composed of:
  + A server, named S
  + N clients, named *Ci* 
+ Each node has its own local clock 
+ The goal is to synchronize the local clocks of all nodes between them
+ Periodically, at server initiative, all nodes synchronize their clocks

This algorithm does not assume any computer with a precise clock.

But one of the computers of the distributed system will act as a server and the others as its clients.

The server periodically broadcasts the value of its clock

+ Each client answers with the difference between its local clock and the server's one

Given the replies, the server:

1. Computes the average difference
2. Updates its own clock
3. Answers to every client with the difference that each of them has to apply in order to update its local clock




