## 1. Concept of Distributed System
#### History

![WhatsApp Image 2017-10-05 at 14.38.52.jpeg](resources/9C1AABE2D231FEF1415604A32FC8824D.jpg =1012x1425)

#### What is a distributed system?
+ Set of autonomous agents -> Each agent is a sequential process, proceeding at its own pace
+ Agents interact. Options:
    + Message passing
    + Shared memory
+ Agents have their own independent state
+ There is some collective goal to this cooperation (which asserts the system's behaviour)
+ In practice, a Distributed System is a Networked System

Summary: Distributed Application: 
+ Many computers
        + Provide a Service 
+ Basically *collection of services*

## 2. Relevance
#### Why should we care about Distributed Systems?
+ Evolving field since its beginnings
    + Heavily studied for their usefulness in the design of time sharing systems
+ Pushed by evolution of computer networks


+ Main reasons:
    + Speed up -> Complex problem divided into pieces each one in a different computer
        + Economically, an advantage -> Expensive resource: can be placed at a single computer and sharred with all the agents. 
    + Fault tolerance -> If one computer breaks down, we still have other computers to take care
    + Resource sharing -> Access resources from everywhere


Nowadays the computer environment is ***distributed and interconnected***
+ Myriad of connected computers
+ Myriad of remote services
+ Challenges (create subsytems capable of delivering well-behaved services

## 3. Main Approaches
#### Client Server
+ Interaction between agents could be very complex
    + Distributed systems need to be programmed as easily as possible
    + Need to make simplifying assumptions to build working systems
+ Two Roles
    + Server -> Waits for client's request
    + Client -> Connects with a Server. Sends request and waits for result
+ Modeled after subroutine invocations
    + Main program is client
    + Invoked Subroutine is server (may hold state)
+ Extremely succesful simplification
+ Web protocols are based on this approach
    + Web Servers wait for clients
    + Browsers are the clients

Typically Client-Server approach implies central delivery of services/resources:
If an agent has a resource to share it is placed on a server, other agents can access those resources contacting with the server. This leads to problems:
+ Scale: large population of clients overload the server
+ Availability: Failure of the server makes resources unavailble

#### Peer to Peer (P2)

In P2P an agent interesent in a resource contacts directly its producer.
+ Resources are spread over the population of agents forming the P2P network
+ The same resource may be replicated and held by more than one agent

## 4. Application Areas

#### 4.1 World Wide Web (WWW)
+ Client/Server model
+ Server attends request for documents
+ Clients are browsers (sending/receiving documents)
    + Browsers parse documents searching for metadata
    + Links are a particular metadata pointing to other documents (they may be in another server)
+ Simple and powerful paradigm
    + Initially for document sharing
    + Extended to allow general service requests

#### Sensor Networks
+ Driven by declining costs of hardware
+ Mini-computers
+ Embedded in common devices
+ Physical world sensors (temp, humidity...)
+ Wide range of applications (power monitoring, biological detection...)

#### Internet of things
+ Generalization of sensor networks
    + Devices interact among them
    + Devices can alter their physical environment
+ New scenarios open up: Smart cities, healtcare...

#### Cooperative Computing 
> Como en ISW labs basicamente (Visual Studio)

+ Most computational power is underused
+ Many engineering and specific problems can be split into pieces
+ Servers can be set up with an instance of such a problem
+ Computers across the internet can subscribe to receive tasks to solve
    + Special client software: task runtime environment
    + Client registers with the server
+ Server spread tasks among the registered clients and collects their results

#### Highly Available Clusters
+ Some environments need a high degree of availability: Banking, finances
    + Having more than one device to cover failures

+ Set of computers, with server programs on which clients depend constantly
+ Holding sensitive data
+ Specific Protocols to stand failures
+ Main Concerns:
    + Preserve data integrity
    + Preserve server operation availability

## 5. Cloud Computing
#### 5.1 Software and Services
**Goal:** Make creation and explotation of services based on software simpler and more efficient

#### 5.2 Roles in the Service Life Cycle
+ Developer: Gets the software components built
+ Service Provider: Decides the characteristics of a service, the components that make it up, and how it should be configured and managed
+ System's Admin: Make sure every piece of software/hardware is in place and properly configured
+ Service User: Accesses the service

#### 5.3 Service Evolution
**Mainframes**
+ System administration taken care of by specialists
+ Systems with reduced user base
+ Efficient use of hardware
    + Shared by a large population of users
    + Low up-front cost for a user
+ Mixed role for Users
    + Many were also developers or their own service providers (third party or own developed software)
+ Users were involved in too many of the management details for the services they finally used

**Personal Computers/Workstations**
+ Users no longer needed to have access to a mainframe in a computer centre
+ Computer infra-utilized
+ In advance, investment cost to purchase
+ Rationalization of the role of developer -> Specialized organizations build the software
+ Still, mixed role of user: Service provider and System admin of their PC
+ Too much complexity for the majority of users

**Enterprise Computer Centers**
+ Including Highly-Available Cluster set-ups
+ Similar characteristics to the PC situation:
    + The user being the enterprise
    + High Personnel cost to take up the roles of system admin and service provider
    + On occasion, developer role, for in-house sotfware (internal programs)
+ 




















