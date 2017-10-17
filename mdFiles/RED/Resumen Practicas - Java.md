## TCP 
### Clients
Socket s = new Socket ("zoltar.redes.upv.es" (Host), 7777 (Port) );
### Servers
**ITERATIVE** 
ServerSocket ss = new Socket (7777);
while (true) {
Socket sc = ss.accept(); 
... (code to provide the service) 
}
Scanner (sc.getInputStream)
PrintWriter(sc.getOutputStream, true) `The true is to avoid the flush() method`
**CONCURRENT**
ServerSocket ss = new ServerSocket(7777);
while (true) {
Socket sc = ss.accept(); 
EchoTCPServer etcps = new EchoTCPServer(sc); 
etcps.start(); 
EchoTCPServer extends Thread
run { 
... (code to provide service) 
}
## UDP 
### Clients
DatagramSocket upds = new DatagramSocket(7777); 
### Servers 
DatagramSocket upds = new DatagramSocket(7777); 
Bytes [] buffer = ...
DatagramPacket dp = new DatagramPacket (buffer, buffer.length);
udps.receive(dp); 
udps.send(); 



















> SPACE
