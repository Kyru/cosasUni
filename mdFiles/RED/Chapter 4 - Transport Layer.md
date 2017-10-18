## 4.1 Transport-layer services 
### Transport services and protocols
+ Provide *logical communication* between app processes running on different hosts
+ Tansport protocols run in end systems
    + send side: break app messages into *segments*, passes to network layer
    + rcv side: reassembles segments into messages, passes to app layer 
+ More than one transport protocol available to apps: 
    + Internet: TCP and UDP  

**Transport vs. Network layer** 
+ Network layer: logical communication between hosts
+ Transport layer: logical communication between processes
    + Relies on, ehances, network layer services  

**Internet transport-layer protocols** 
+ Reliable, in-order delivery (TCP = Transmission Control Protocol)
    + Congestion control 
    + Flow control 
    + Connection setup 
+ Unreliable, unordered delivery (UDP = User Datagram Protocol) 
    + no-frills extension of "best-efford" IP 
+ Services not available: 
    + Delay guarantees 
    + Bandwidth guarantess 

# 4.2 Multiplexing and demultiplexing

### Addressing of Transport-Layer 
![Captura de pantalla 2016-12-06 a las 19.32.35.png](resources/11381590D39C95C7D5CF72C976C01207.png)

+ Source/ Destination Port:
    + 16-bits number 
        + There are 65,535 possible port numbers (2 to the power of 16 minus 1) 
![Captura de pantalla 2016-12-06 a las 19.49.43.png](resources/F84F62D8DCFEC31B7CF4638D9D6E4534.png)

### Multiplexing/demultiplexing 
![Captura de pantalla 2016-12-06 a las 19.51.25.png](resources/D36359D3422532FC79E564A0F865EE34.png)

**How demultiplexing work**
+ Host receives IP datagrams
    + Each datagram has source IP address, destination IP address
    + Each datagram carries one transport-layer segment
    + Each segment has source, destination port number 
+ Host uses IP addresses & port numbers to direct segment to appropriate socket 

**Connectionless demultiplexing** 
+ Created socket has host-local port #
+ `DatagramSocket mySocket1 = new DatagramSocket (12345);`
+ When creating datagram to send into UPD socket, must specify:
    + Destination IP address
    + Destination Port #
+ When host receives UDP segment:
    + Checks destination port # in segment
    + Directs UDP segment to socket with that port #
    + > IP datagrams with same dest.port #, but different source IP addresses and/or source port numbers will be directed to *same socket* at destination 
+ Example:

### ![Captura de pantalla 2016-12-06 a las 20.19.48.png](resources/70C387B610D02519E1962AC4366DDEF9.png)

`remember Dest = destination`

**Connection-oriented demux** 
+ TCP socket identified by **4-tuple**:
    + Source IP address
    + Source port number
    + Dest IP address
    + Dest port number
+ Demux: receiver uses all four values to direct segment to appropriate socket
+ Server host may support many simultaneous TCP sockets: 
    + Each socket identified by its own 4-tuple 
+ Web servers have different sockets for each connecting client
    + Non-persistent HTTP will have different socket for each request 
+ Example: 

![Captura de pantalla 2016-12-06 a las 20.54.42.png](resources/82731D57B31B32BA0C8FEF01A44309A3.png)

`P4, P5 and P6 can be joint into a threaded server, which contains all of them`

![Captura de pantalla 2016-12-06 a las 20.56.10.png](resources/13AC9DF9A9187F8D563CED3A7C5EF75C.png)

# 4.3 Connectionless transport: UDP 
### UPD: User Datagram Protocol 
+ "no frills", "bare bones" Internet transport protocol
+ "Best effort" servide, UDP segments may be: 
    + Lost
    + Delivered out-of-order to app
+ Connectionless:
    + No handshaking between UDP sender, receiver
    + Each UDP sender handled independently from others
+ UDP use: 
    + Streaming multimedia apss (less tolerant, rate sensitive) 
    + DNS
    + SNMP
+ Reliable transfer over UDP: 
    + Add reliability at application layer 
    + Application-specific error recovery!

### UDP: Segment header 
![Captura de pantalla 2016-12-07 a las 12.52.23.png](resources/EDC2F2BC47C6B1F089EA8A4CDA5B67B6.png)

### UDP Checksum 
*Goal:* detect "errors" (eg. flipped bits) in transmitted segment 
**Sender:**
+ Treat segment contents, including header fields, as a sequence of 16-bit integers
+ Checksum: addition (one's complement sum) of segment contents
+ Sender puts checksum value into UDP checksum field

**Receiver:**
+ Compute checksum of received segment
+ Check if computed checksum equals checksum field value 
    + NO - error detected
    + YES - no errors detected
    
Example:
![Captura de pantalla 2016-12-07 a las 13.12.15.png](resources/7F5D1AD78E4558D4794F602995FFE63D.png)
`note: when adding numbers, a carryout from the most significant bit needs to be added to the result`

# 4.4 Principles of reliable data transfer 
**Principles** 
Reliable data transfer is a problem that appears in application , transport and link layers
+ **Problem:** How can we achieve a reliable data transfer over unreliable networks?
    + Undelying layer can loss packets or may flip bits in transmitted packet
+ **Solution:** 
    + Detection 
        + Checksum to detect bit errors
    + Retransmission 

### Perfect Channel and Real Channel 
+ **Perfect Channel:** 
    + Underlying channel perfectly reliable 
        + No bit erros
        + No loss of packets
+ **Real Channel:**
    + Transmission error, congestion, routing errors...
    + Receiver: 
        + Is the received packt correct? 
        + What can the receiver do if the packet isn't correct? 
    + Sender: 
        + Was the packet correctly received? 

**Solution: ARQ (Automatic Repear reQuest)**
+ error detection 
+ feedback:: control msgs (ACK) from receiver to sender
+ Retransmission in case of failure
    + If ACK is not received before RTO (Retransmission time-out) the packet is *retransmitted* 

### ACK 
+ <u> Sender: </u> 
+ What happens if ACK doesn't arrive? 
    + Packet loss?  
    + ACK loss? 
    + Sender doesn't know what happened at receiver! 
+ <u> Receiver: </u>
+ Must check if received packet is corrupted
    + Error detection (Check-sum) 

### Packet loss
+ Sender waits "reasonable" amount of time for ACK 
+ Retransmits if no ACK received in this time 

![Captura de pantalla 2016-12-07 a las 14.04.59.png](resources/44F848592C58189EB51D6CAC0E6E1CFC.png)

### Duplicates 
**Handling Duplicates:**
+ <u> Sender: </u> 
+ if pkt (or ACK) just delayed (not lost): 
    + Retransmission will be duplicate
    + Sender adds sequence number to each pkt 
    + Receiver discards (doen't deliver up) duplicate pkt 
+ <u> Receiver: </u> 
+ Receiver must specify seq # of pkt it is waiting 

![Captura de pantalla 2016-12-07 a las 14.08.52.png](resources/38723E316BE4D29DED1A13A51EE2C807.png)

**Stop and Wait** 
+ Sender sends one packet, then waits for receiver response
+ Simple but inefficient!! 
+ Network protocol limits use of physical resources! 

![Captura de pantalla 2016-12-07 a las 14.09.49.png](resources/DD14ACB845FC15A2D7A5F31ED577E13C.png)

### Pipeline Protocols 
**pipelining:** sender allows multiples "in flight" yet-to-be-acknowledged pkts
+ range of sequence numbers must be increased
+ buffering at sender and/or receiver 

![Captura de pantalla 2016-12-07 a las 14.11.52.png](resources/158DF4ABBF29C98DA563C39AE67C6F71.png)

### Overview
`two generic forms of pipelined protocols: go-Back-N and selective repeated`

<u> Go-Back-N: </u> 
+ sender can have up to N unacked packets in pipeline 
+ Receiver only sends *cumulative ack*
    + Doesn't ack packet if there's a gap 
+ Sender has timer for oldest unacked packet
    + When timer expires, retransmit all unacked packtes 
  
<u> Selective Repeat: </u> 
+ Sender can have up to N unacked packets in pipeline 
+ rcvr sends *individual ack* for each packet 
+ Sender maintains timer for each unacked packet
    + When timer expires, retransmit only that unacked packet 

### Go-Back-N
+ k-bit seq # in pkt header 
+ "window" of up to N, consecutive unack'ed pkts allowed
![Captura de pantalla 2016-12-07 a las 14.19.26.png](resources/AAD35BD50CE8F282C0DD777D99A0694B.png)
+ ACK(n): ACKs all pkts up to, including seq # n - "cumulative ACK"
    + May receive duplicate ACKs `(see receiver)`
+ Timer for oldes in-flight pkt 
+ *timeout(n):* retransmit packet n and all higher seq # pkts in window 

![Captura de pantalla 2016-12-07 a las 14.24.24.png](resources/1020AE9988C9AF384288889BA4CCFD6E.png)

### Selective Repeat
+ Receiver *individually* acknowledges all correctly received pkts 
    + Buffers pkts, as needed, for eventual in order delivery to upper layer 
+ Sender only resends pkts for which ACK not received
    + Sender timer for each unACKed pkt 
+ Sender Window: 
    + N consecutive seq #'s
    + limit seq #s of sent, unACKed pkts 

**Selective repeate: sender, receiver Windows**
![Captura de pantalla 2016-12-07 a las 14.25.09.png](resources/F2877A6EED52FD0DFCCDED54E2DA5E31.png)

*Sender:*
+ **data from above:** if next available seq # in window, sen pkt 
+ **timeout(n):** resend pkt n, restart timer 
+ **ACK(n):** 
    + Mark pkt n as received
    + If n smallest unACKed pkt, advance window base to next unACKed seq #
    
*Receiver:*
+ **pkt n in [rcvbase, rcvbase+N-1] :**
    + send ACK(n) 
    + out-of-order: buffer
    + in-order: deliver (also deliver buffered, in-order pkts), advance window to next not-yet-received pkt
+ **pkt n in [rcvbase-N, rcvbase -1] :** ACK (n) 
+ **otherwise:** Ignore 

![Captura de pantalla 2016-12-07 a las 18.17.51.png](resources/8D49665985A48AE0825C222DB7BF1018.png)

# 4.5 Connection-oriented transport: TCP 
## Segment Structure 

### TCP Overview
+ Point-to-point: one sender, one receiver
+ Reliable, in-order byte steam: no "message boundaries" 
+ Pipelined: TCP congestion and flow control set window size
+ Full duplex data: 
    + bi-directional data flow in same direction 
    + MSS: Maximum segment size 
+ Connection-oriented: handshaking (exchange of control msgs) inits sender, receiver state before data exchange
+ Flow controlled: Sender will not overwhelm receiver 

![Captura de pantalla 2016-12-07 a las 18.34.53.png](resources/5D69B2F4B4ABBABCA305E50EFC7E6819.png)
![Captura de pantalla 2016-12-07 a las 18.35.13.png](resources/F0B1BE21B7DCE9C024B3EF11946DAF53.png)

### TCP seq. numbers, ACKs
<u> Sequence numbers: </u> 
+ Byte Stream "number" of first byte in segment's data 

<u> ACKs </u>
+ Seq # of next byte expected from other side 
+ Cumulative ACK 
+ How receiver handles out-of-order segments
    + Answer: TCP spec doesn't say, up to implementor 

![Captura de pantalla 2016-12-07 a las 18.44.40.png](resources/6DFAA68019844603F0332CBB1630B140.png)

![Captura de pantalla 2016-12-07 a las 18.45.17.png](resources/48FEBAB49231679EC3964E25B67C37E7.png)

### Acknownledgements
+ To reduce acknowledgements traffic, acknowledgements generating may be delayed until: 
    + Received another segment
    + Send a segment in the opposite direction (piggybacking) 
    + A timer (expires every 500 milliseconds) 

## Flow Control 
### TCP Flow Control 
*Flow Control:* Receiver controls sender, so sender won't overflow receiver's buffer by transmitting too much, too fast 

![Captura de pantalla 2016-12-07 a las 18.49.21.png](resources/CD7D484E61231C5910CA357972F2744B.png)

+ Receiver "advertises" free buffer space by including *rwnd* value in TCP header of receiver-to-sender segments
    + RcvBuffer -> Size set via socket options (default 4096 bytes) 
    + Many OS use autoadjust RcvBuffer 
+ Sender limits amount of unACKed ("in-flight") data to receiver's *rwnd* value
+ Guarantess receive buffer will not overflow 

![Captura de pantalla 2016-12-07 a las 19.07.59.png](resources/08CC4E014022187B7E9C70F5657EA698.png)

![Captura de pantalla 2016-12-07 a las 19.08.05.png](resources/7C1E049DD084CDEE7F11760FBC02BF6C.png)
![Captura de pantalla 2016-12-07 a las 19.08.30.png](resources/57D4EF38C4B24B8CE71B0C7D3710ED3C.png)

## Reliable Data Transfer 
### TCP reliable data transfer 
+ TCP creates rdt service on top of IP's unreliable service
    + Pipelined Segments
    + Cumulative ACKs 
    + Single retransmission timer 
+ Retransmission triggered by: 
    + Timeout events
    + Duplicate ACKs 
+ Let's initially consider simplified TCP sender
    + Ignore duplicates ACKs 
    + Ignore flow control, congestion control

### TCP sender events
**Data rcvd from app:** 
+ Create segment with seq #
+ Seq # is byte-stream number of first data byte in segment
+ Start timer if not already running
    + Think of timer as for oldest unaked segment
    + Expiration interval: `timeout interval`

**timeout:**
+ Retransmit segment that caused timeout
+ Restart timer

**Ack rcvd:** 
+ If ack acknowledges previously unacked segments
    + Update what is known to be ACKed
    + Start timer if there are still uncaked segments


![Captura de pantalla 2016-12-07 a las 19.28.53.png](resources/2746F6FE283E5C5DF555CAB71A1681AC.png)
![Captura de pantalla 2016-12-07 a las 19.28.59.png](resources/4037A321A77DD7E6F749B52CD837DBF0.png)
![Captura de pantalla 2016-12-07 a las 20.27.58.png](resources/7D0FF4D53607717EC74F813B48F054E0.png)

### TCP Fast Retransmit
+ Time-out period often relatively long: 
    + Long delay before resending lost packet
+ Detect lost segments via duplicate ACKs.
    + Sender often sends many segments back-to-back 
    + If segment is lost, there will likely be many duplicate ACKs

*TCP fast retransmit:* If sender receives 3 ACKs for same data ("Triple duplicate ACKs") resend unacked segment with smallest seq #. Likely that unacked segment lost, so don't wait for timeout. 

![Captura de pantalla 2016-12-07 a las 20.32.25.png](resources/101C0ACBE2F4FF83AA3F652D38FB9009.png)

### TCP round trip time, timeout
**How to set TCP timeout value?** 
+ Longer than RTT (but RTT varies) 
+ *too short:* premature timeout, unnecessary retransmissions
+ *too long:* slow reaction to segment loss

**How to Estimate RTT?**
+ SampleRTT: measured time from segment transmissions until ACK receipt (ignore retransmissions) 
+ SampleRTT will vary, want estimated RTT "smoother"
    + Average several *recent* measurements, not just current SampleRTT

EstimatedRTT = (1 - α) \* EstimatedRTT + α * SampleRTT
+ Exponential weigthed moving average
+ Influence of past sample decrease exponentially fast
+ typical value: α = 0,125
![Captura de pantalla 2016-12-07 a las 20.38.13.png](resources/630184B02194D7E65E730AD9FA797518.png)

### TCP round trip time, timeout
+ timeout interval: EstimatedRTT plus "safety margin" 
    + Large variation in EstimatedRTT -> Larger safety margin 
+ estimate SampleRTT deviation from EstimatedRTT:
![Captura de pantalla 2016-12-07 a las 20.40.28.png](resources/1435CAF3A6BD16DEE26BE0E3295AA017.png)

+ When a segment is retransmitted and an ACK is received is impossible to know at which copy corresponds (original or retransmitted segment) 
    + Solution: Karn Algorithm 
        + Not taking into account the RTT measures of retransmitted segments
        + In retransmitions, RTO value double (exponential backoff)


![Captura de pantalla 2016-12-07 a las 20.43.13.png](resources/674CA3B0C140B65FE4E68FB1FC0BE88F.png)

## Connection Management
Before exchanging data, sender/receiver "handshake": 
+ Agree to establish connection (each knowing the other willing to establish connection) 
+ Agree on connection parameters
![Captura de pantalla 2016-12-07 a las 20.47.17.png](resources/F626347E5B52616CDB17939FDCCB17D6.png)

### Agreeing to establish a connection 

`Before exchanging data, you have to establish a connection. Then you have to agree on connection parameters, when this is done, you can send and receive data. As we have established the TCP connection.`

![Captura de pantalla 2016-12-08 a las 17.03.23.png](resources/3042E2E168CFBB266EFEE2CA1EC5EADD.png)
![Captura de pantalla 2016-12-08 a las 17.03.27.png](resources/45A5A58994278C200929C9A0F18A1DAF.png)
![Captura de pantalla 2016-12-08 a las 17.03.34.png](resources/AF4A660DEE0F89241EA8433C70D03413.png)

`When we create a Socket ("Pasive"), it is waiting for accepting the request. When it is received the connection is established. No need for a 3-way handshake ("3 hello"), 2 are sufficient. `

### Reset Flag
RESET: abortion of a TCP connection.
Causes: 
+ Sequence numbers impossible
+ The destination port is not in use (not open) 
![Captura de pantalla 2016-12-08 a las 17.14.03.png](resources/C63392204D625D9ACEDFB72B62E7D8AB.png)
`Both ends can reject the connection`

### Duplicated delayed
![Captura de pantalla 2016-12-08 a las 17.15.25.png](resources/F662D31D9A656EBDABDF9B190FC10A35.png)

### TCP Options
Each end of the connection announces its MSS (Maximum Segment Size) in the SYN segment: 
+ Eg: If host A announces MSS = 100 bytes, segments with more than MSS bytes can not be sent to it.
+ By default, MSS = 536 bytes
![Captura de pantalla 2016-12-08 a las 17.22.17.png](resources/E93D4B4F9B468999E40D1E0AE7378C6F.png)

### TCP Options: Window Scaling 
TCP hosts agree to limit the amount of unacked data that can be in transit any given time. 
This is referred to as the *window size*, and is communication via 16 bit field in the TCP header: 
+ Maximum receive window is only 65,535 bytes
+ If RTT*vtrans > 655356 -> It wastes potential throughput 

Solution: TCP window scaling option 
+ Window scaling simply extends the 16-bit window field to 32 bits in length. *(Where 2<sup>n</sup> is the value of the window scaling option)* 
+ The window scaling option may be sent only once during a connection by each host, in its SYN packet
+ By using the window scale option, the receive window size may be increased up to a maximum value of 1,073,725,440 bytes
    + *The maximum valid scale value is 14* 
  
Example: 
![Captura de pantalla 2016-12-08 a las 17.28.19.png](resources/53F252F2F7671BE49E7567D439C56DD9.png)

### TCP Options: Selective Acknowledgement
**Sack-Permitted Option**
+ This option may be sent in a SYN by a TCP that has been extended to receive (and presumably process) the SACK (*Selective Acknowledgement)* option once the connection has opened. 
+ It MUST NOT be sent on non-SYN segments

The SACK option is to be used to convey extended acknowledgement info from the receiver to the sender over an established TCP connection. 

Cumulative ACKs can not confirm the reception of segments out of order
+ May cause unnecesary retransmissions

The selective ACKs (SACK) permits the receptioon of out order segment
+ Each block represents received bytes of data that are contiguos and isolated; that is, the bytes just below the block, (left Edge of Block - 1), and just above the block, (Right Edge of Block), have not been received. 
![Captura de pantalla 2016-12-08 a las 17.35.24.png](resources/78F5D603782161D5576A7281F566B644.png)

### TCP Options: Timestamp 
+ Timestamp is used to calculate more accurately the RTT 
+ The Timemstamp options carries two four-byte timestamp fields
    + The TSval field contains the current value of the timestamp clock of the TCP sending the option 
    + The TSerc field is valid if the ACK bit is set in the TCP header
![Captura de pantalla 2016-12-08 a las 17.45.12.png](resources/5AE03229CE9FB470D88EDB76D60451DB.png)
**Example:**
![Captura de pantalla 2016-12-08 a las 17.45.38.png](resources/E1D4692B9C5269EF3972F68D924225F3.png)

### TCP: Closing a connection 
+ Client, server each close their side of connection
    + Send TCP segment with FIN bit = 1
+ Respond to received FIN with ACK 
    + On receiving FIN, ACK can be combined with own FIN 
+ Simultaneous FIN exchanges can be handled 
![Captura de pantalla 2016-12-08 a las 17.47.43.png](resources/55CB7888D0D4C4986D24EE7C34EFF743.png)

## Principles of congestion Control 
### Principles of congestion control
*Congestion:*
+ Informally: "To many sources sending too much data too fast for *network* to handle" 
+ Different from flow control! 
+ Manifestations: 
    + Lost packets (buffer overflow at routers) 
    + Long delays (queuing in router buffers) 

### Goals of TCP Congestion Control 
+ Congestion is bad for the overall performance in the network 
    + Excessive delays can be caused
    + Retransmissions may result due to dropped packets
        + Waste of capacity and resources
    + In some cases (UDP) packet losses are not recovered from 
    + *Note:* Main reason for lost packets  in the Internet is due to congestion -- errors are rare
+ **Goal of TCP is to determine the available netweok capacity and prevent network overload.**
    + Depends on other connections that share the resources 

TCP Sender must use ***two algorithms*** to control the amount of outstanding data being injected into network
+ Slow start algorithm 
+ Congestion avoidance algorithm 

To implement these algorithms, two variables are added to the TCP per-connection state. 
+ The **congestion window (cwnd)**
    + It is a sender-side limit to the amount of data the sender can transmit into the network befor receiving an ACK
+ The **Slow start threshold (ssthresh)**
    + It is used to determine whether the slow start or congestion avoidance algorithm is used to control data transmission 
+ When **cwnd < ssthresh** => The ***slow start*** algorithm is used
+ When **cwnd > ssthresh** => The ***congestion avoidance*** algorithm is used 

**The minimum of cwnd and rwnd governs data transmission**
`transmission windows (twnd) = min (cwd, rwd)`
> Remember that the receiver's advertised window (rwnd) is a receiver-side limit on the amount of outstanding data

### Slow Start algorithm 
Beginning transmissions into a network with unknown conditions requires TCP to slowly probe the network to determine the available capacity, in order to avoid congesting the network with an inappropriately large burst of data 
The **slow start** algorithm is **used** for this purpose: 
+ At the beginning of a transfer **OR**
+ After repairing loss detected by the retransmission timer

**At the beginnig of a transfer** 
+ cwnd = 2 segments
+ When an ACK is received : cwnd += 1 segments
+ sstresh = rwnd 

![Captura de pantalla 2016-12-08 a las 19.01.06.png](resources/A13768DDD21CD3CBBF31906B9017568F.png)

### Congestion Avoidance Algorithm 
When the number of byts acknownledged reaches cwnd, the cwnd can be incremented by up to 1 segment
`cwnd += 1/cwnd` 

### Congestion Detection 
+ Packet loss is a sign of congestion 
+ Two indicators of congestion 
    + A retransmission timer expires (timeout) 
    + Three duplicate ACKs are received

What does TCP do then? 
+ ssthresh = max (twnd/2 , 2 ) 
+ **After repariring loss detected by the retransmission timer** 
    + cwnd = 1 segment 
    + slow start 
+ **When 3 ACKs are received** 
    + cwnd = ssthresh 
    + congestion avoidance 
 
![Captura de pantalla 2016-12-08 a las 19.06.14.png](resources/4F6CF3A8F1B8737080950328E3B38F0F.png)
> As we can see when cwnd < ssthresh we use the slow start

![Captura de pantalla 2016-12-08 a las 19.06.19.png](resources/6581FE17542257F520ADAAA8477F8ABB.png)
> At the beginning the transition follows the congestion window, until it arrives to the change, where it will follow the rwnd. When a packet is lost a new ssthresh will be created. We can see that in this case this occurs due to a timeout

### Fairness 
**Fairness and UDP** 
+ multimedia apps often do not use TCP 
    + do not want rate throttled by congestion control 
+ Instead of using UDP: 
    + Send audio/video at constant rate, tolerate packet loss

**Fairness, paralled TCP connections** 
+ Application can open multiple parallel connections between two hosts
+ *Web browser do this*















> SPACE 
