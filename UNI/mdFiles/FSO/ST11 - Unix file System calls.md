### UNIX files
+ Secondary storage abstraction
+ File types: 
    + **Regular:** common files that contain data or binary code (text files, image files, executable files, etc. ) 
    + **Directory:** file containers which content is dierctory entries 
    + **Pipe:** unnamed sequential access files for interprocess communication 
    + **FIFO:** named sequential access files for interprocess communication 
    + **Special:** hardware or virtual device system abstraction, for instance: 
        + Console devices are /dev/ttyX (X=0,1,..) 
        + Sound card is /dev/dsp
        + Virtual sink is /dev/null 
+ File attributes in Unix: 
    + File type 
    + Owner user (UID) 
    + Owner group (GID) 
    + Access permissions (permission bits) 
    + Number of links
    + Creation, last access and last change time stamps
    + Size 

**Unix directory entry: i-node** 
OS data structure to store file attributes except its name (a file can have several names or links) 
+ Every Unix file has one i-node
+ It points to file content using indexed block allocation that can be direct, indirect, double indirect and triple indirect

![Captura de pantalla 2016-12-26 a las 16.54.42.png](resources/766BDC96CB530FEBD5AC2DB87602686F.png)

**File structure:**
+ Vector of bytes 

**File access mode:**
+ Sequential access with ***read/write*** calls: 
    + Read/write (fd, buffer, nbytes) 
+ Iseek allows direct access specifying on offset from the file start, or actual location 
    + Isee (fd, offset, from\_where) 

![Captura de pantalla 2016-11-30 a las 12.59.19.png](resources/70570A5DE16770A720426AA7BA8DE6D9.png)

**File descriptor**
+ To read or write a file it must be first opened and last closed

![Captura de pantalla 2016-12-26 a las 16.56.52.png](resources/71430C177AFF3008E637B0B54D9AE4A9.png)

+ A file descriptor (fd) is an abstract file identifier local to every process
    + File access inside a process is done through the file descriptor (table index) given by ***open***
    + Working with file descriptors does file access more efficient, avoids looking for them in disk for every access

**Open file operation**
+ It looks for the file in the directory structure and brings its attributes to an entry in the opened files table located in main memory 
+ It registers some additional attributes like: 
    + Location pointer
    + Number of active open calls
    + Disk location of data 
+ The file content is brought partially into memory buffers 

**Close file operation** 
+ It frees the corresponding entry in the opened files table

![Captura de pantalla 2016-12-26 a las 17.02.30.png](resources/B754368214577AA45688C284D1D7F6C0.png)

**File descriptors and standard I/O** 
+ The first three file descriptors in a process have a proper name:

![Captura de pantalla 2016-12-26 a las 17.03.53.png](resources/9CD1A3B1596F6E4F05544FCDF7A00E0B.png)

+ By default these file descriptors are associated to the console
    + Console devices are /dev/ttyn or /dev/ptn/n 

**Use examples:** 
+ ***From the C library*** *scanf* reads from standard input and *printf* writes on the standard output
+ ***From the Shell*** its commands read and write in the standard I/O, for instance, command "ls" writes the file listing on the standard output and writes the error message "No such file or directory" in the standard error

![Captura de pantalla 2016-12-26 a las 17.07.50.png](resources/A89B194057E42AB890D61003C07DDF67.png)

![Captura de pantalla 2016-12-26 a las 17.08.04.png](resources/DA14082F746FA9E7C7983D761B68F99A.png)
![Captura de pantalla 2016-12-26 a las 17.10.21.png](resources/3DA556E0EE5089B68BD495FB6258D2B8.png)
![Captura de pantalla 2016-12-26 a las 17.11.55.png](resources/E45C97572493F3F2B517D2D2DE6A88BA.png)

###Unix files system calls 

System call to work with file and devices
+ Unix implements a unified interface to access files and I/O devices

![Captura de pantalla 2016-12-26 a las 17.16.08.png](resources/F610A185D5A6DB5D3B05D2D2232DE575.png)

> Note: System calls "read" and "write" don't perform any format conversion, so formated I/O functions in C like *scanf* and *printf* include format conversion code 

![Captura de pantalla 2016-12-26 a las 17.17.57.png](resources/2C72DD74198A621C4A06F12602869F30.png)
![Captura de pantalla 2016-12-26 a las 17.18.21.png](resources/9EF57CA2575456C81A12D0BA0BE88FDC.png)
![Captura de pantalla 2016-12-26 a las 17.18.58.png](resources/B35A065ECA75818C20BEE444E8F7D013.png)
![Captura de pantalla 2016-12-26 a las 17.21.35.png](resources/B602DF79EAD35528F684143FDB63E701.png)

###Redirections and pipes
+ Standard input redirection
  `mail gandreu < mensaje`

![Captura de pantalla 2016-12-26 a las 17.22.49.png](resources/88FF4F23A009BAD6D407CF39989B3B89.png)
+ Standard output redirection
  `echo hola > f1.txt`

![Captura de pantalla 2016-12-26 a las 17.22.52.png](resources/D5964FB171FC801535130E7A5C0EAAE2.png)
+ Standard error redirection
  `gcc prg.c -o prg 2> error`

![Captura de pantalla 2016-12-26 a las 17.22.56.png](resources/CC4DB1EB107D58C93D865EA5BC660A1C.png)

![Captura de pantalla 2016-12-26 a las 17.25.39.png](resources/76DD5C36A5DC24372C8060A5A1458062.png)

### Redirection and pipe system calls

They allow performing communication between parent and children processes relying on inheritance: dup2, pipe and mkfifo (which creates a named pipe) 

![Captura de pantalla 2016-12-26 a las 17.27.35.png](resources/C87ADDBB794BB94DB4C644B92C49E85B.png)
![Captura de pantalla 2016-12-26 a las 17.28.29.png](resources/77D41D4A5DCAB4425C1C959477B0665B.png)
![Captura de pantalla 2016-12-26 a las 17.30.16.png](resources/683F96B8681B7929FC27A6AAC9BDE7D2.png) 

**Pipe operations** 
+ Read: 
    + If there are bytes available, at most the requested **nbytes** are read
    + If pipe is empty, **read** suspends the calling process until bytes are available in the pipe
    + When there is no pipe writing descriptor (bellowing to the reading process or any other one) **read** doesn't suspend the process and returns 0, noticing in this way the ending data condition (end of file) 
+ Write: 
    + If there is enough pipe capacity to allocate the nbytes to write they are stored into the pipe in FIFO order
    + If there is not enough capacity (pipe full) the writing process is suspended until space is available
    + If writing is done into a pipe that doesn't own a reading descriptor (bellowing to the reading process or any other one) the process that intends to write receives a SIGPIPE signal
        + This mechanism eases automatic removing of a pipe communicating process chain when one of its components aborts unexpectedly 

![Captura de pantalla 2016-12-26 a las 17.35.50.png](resources/436C12528DD029C579E7C4DA50DDF65C.png)
![Captura de pantalla 2016-12-26 a las 17.35.57.png](resources/078C58553404515F66623D0413CA89F4.png)
![Captura de pantalla 2016-12-26 a las 17.36.03.png](resources/3BEA42D542B4C952BCDC756BCE12A55C.png)



















> SPACE 
