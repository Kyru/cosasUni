#### 4.5 Aspects of Synchrony

1. Time -> Cannot be perfectly represcuted -> Each process has its notation of the current time -> Different views (one per process in the worst case)

2. Synchrony -> Synchronous processes: (example of a 2-face commit protocol)
+ Each process executed a step "at the time"
    + Algorithms define execution phases
        + Every process completes a phase before starting the following one 
            
Synchronous processes: we need a round of communication at the end of each "step" (*This doesn't scale*)

**Synchronous channels: (Feasible in a LAN)**
+ Transmission time is bounded -> That upper limit is known
    + Useful for failure detection!
        + Processes
        + Channels

Synchronous messaage order:
+ Can message delivery be ordered? Which order may be ensured

Basic message order: FIFO
P1 -----> P2






















