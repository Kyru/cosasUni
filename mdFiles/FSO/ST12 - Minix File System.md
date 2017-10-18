### Partition Structure
A **Minix partition** is built upon a set of fixed size blocks (i.e 1KBytes) 
A partition structure contains: 
+ A **header** made up of blocks groups intended to store the data structures that sustain the file system 
+ **Data area** made up of blocks intended to store file data 

![Captura de pantalla 2016-12-27 a las 12.14.46.png](resources/B473E65A3FBDBDCC912BD1687366C25E.png)

### Header blocks 

![Captura de pantalla 2016-12-27 a las 12.15.57.png](resources/C8BA400A0D45CC67807A582F810BC637.png)

+ **Boot block:** contains the boot program that loads the OS and transfers the control to it 
+ **Superblock:** is a data structure with the file system description that indicates the size and location of every element 
+ **i-node bit map:** bit vector to manage free and allocated i-nodes. It contains one bit per zone 
+ **Zone bit map:** bit vector to manage free and allocated zones. It contains one bit per zone. 
+ **i-node blocks:** contains the i-node data structures. The i-node number depends on the partition size (i-node 0 is not used) 

![Captura de pantalla 2016-12-27 a las 12.20.09.png](resources/245AF5FE3DEC7D2C867E455E4A6DFE75.png)
![Captura de pantalla 2016-12-27 a las 12.20.24.png](resources/F1517A3A560D5057CDC0EABD3E1C2348.png)
![Captura de pantalla 2016-12-27 a las 12.21.11.png](resources/E01CDCA3D4C52E4D35672EFFD3A95D93.png) 

### i-node Structure 

Data structure that contains all the file attributes except its name
+ Every file has an associated i-node
+ It controls indexed allocation by means of direct, indirect and double indirect pointers 

![Captura de pantalla 2016-12-27 a las 12.28.12.png](resources/38459DA2F7B7458329A87C546B94F5AF.png)

**Performance analysis** 
+ *Efficient random access:** The maximum number of disk accesses is limited to 4
    + The indirect pointers are only used with big or very big files (commonly few) 
    + Small file (common case) access is very efficient
+ *Reliable and elegant design:* Every file has its own separated data structure

### Directory entry 

**Minix directories**
+ Directory structure as a directed acyclic graph (DAG) 
+ Directories are files which content is interpreted as registers -> directory entries (also named links) 

**Minix directory entry or link** 
+ It has a 16 byte size 
    + 2 bytes for the i-node
    + 14 bytes for the file name 
    

![Captura de pantalla 2016-12-27 a las 12.32.03.png](resources/2E922EBE5F9FFA2AA5E53B9C09B82E27.png)

**Directory entry** 
+ When a directory is created, the entries '.' and '..' are automatically created
+ **i-node 1 describes the root directory** 
+ When a directory entry is removed it is marked with i-node 0

![Captura de pantalla 2016-12-27 a las 12.33.27.png](resources/2390F1E4FD6E4EE2E36D05BB9DC9FB80.png)

### Standard sizes 

Default sizes for Minix elements: 
+ 1 Zone = 2<sup>0</sup> blocks = 1024 bytes
+ 1 pointer to zone or block = 2 bytes = 16 bits
+ 1 directory entry = 16 bytes 
+ 1 i-node = 32 bytes 





















> SPACE 
