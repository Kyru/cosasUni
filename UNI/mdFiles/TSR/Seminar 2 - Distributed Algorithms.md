Degree of synchrony / asynchrony -> we will use asynchrony

Asynchronous system: 
+ Processes:
    + Use asynchronous sendings 
        + They dont remain blocked onec a message is sent
        + Don't proceed in phrases
+ Communication:
    + Message transmission has no kwown limit/bound

DS/DA = (P,C) 
where P = processes
C = Communication directed (channels/links)
+ Failure of a given process doesn't alter the communication among the other processes
+ Reliable channels -> Messages are always delivered to their target (except when that concrete target fails)

*Mutual exclusion:*
+ Why?
    + Because there is some shared resource with potential concurrent accesess
    + We use an algorithm to ensure sequenctial access (instead of concurrent) to the resource. The fragment od code where the shared resource is accessed is the **CRITICAL SECTION**

1. other code...
2. Enter a CS requesting protocol  (CS = Critical section)
    + Ask for permission
    + Wait until that permission is granted
3. Execute the critical section
4. Enter a leave-CS protocol in order to:
    + If any requestors exist, choose one of them, and grant permission to it
    + Otherwise, mark CS as free

Correctness properties in distributed algorithms:
+ *Safety:* Nothing wrong ever happens. i.e: all steps are correct
+ *Liveness:* Eventually, the goal of the algorithm is achieved

In our Mutual Exclusion (ME) algorithms:
+ *Safety:* At most 1 process is in the critical section 
+ *Liveness:* All requestors enter the CS
+ *Casual order:* Casual order is respected for accessing the CS

![Imagen JPEG-49FCD5A73975-1.jpeg](resources/ADD585385A89EB19152015E71C11C4E9.jpg =1610x853)

**Ring algorithm:**
The token is forwarded when the receiver doesn't need to execute the CS. Otherwise, the token is kept until the CS is completely executed and then it is also forwarded

![Imagen JPEG-52872B448CEF-1.jpeg](resources/0C8EE0C7B56D95F7B2DCDA859B2D7902.jpg =1836x1360)

















