An *Information system (IS)* is a collection of elements, which are orderly related to each otherother

**Database** -> Is a collection of structured data
**Database managemente system (DBMS)** Software tool (collection of programs) that enables users to create, manipulate and mantaina database.

### The Relational Data Model
+ Entities are represented as ***tables***
+ Objects correspond to table ***rows*** 
+ Object's features are represented by ***attributes*** -> Columns (also know as ***fields***
+ Attributes in the same column must have the same ***datatype*** (domain)

### Relational database goals

1. *Store* and *modify* the information of interest using **INSERTION, DELETION, UPDATE**
2. *Access* and retrieve that information **QUERY** 


A relational query is a retrieval operation to a database which returns part of the information of the database, possibly combined and/or aggregated, in the form of a single table



Exercise 1.1:

1. Subject [nombre]
2. (Subject WHERE GP=4) [nombre]
3. (Lecturer x Teaching WHERE categoria = "Titular" AND cod_asg = "11545") [nombre]
4. (((Lecturer(nombre, name\_l) WHERE categoria = "Titular") x (cod\_pro) Teaching) x (Cod_asg)
   (Subject WHERE semestre = "1A")) [name_l]
5.
    
     


























