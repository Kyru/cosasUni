### Terminology

+ Table = Relation
+ Row / Record = Tuple
+ Column / Field = Attribute (property with a name and an associated type)
+ Data Type = Domain

---
## 2 - Introduction to relational databases

### 2.2 Relation database goals

The goal of a database is that users and applications can:
1. Store and modify the information of interest
      + Insertion
      + Deletion
      + Update
2. Access and retrieve that information:
      + Query
 

A **relational query** is a retrieval operation to a databse which returns part of the information of the database, possibly combined and/or aggregated, in the form of a single table

### 2.2 Goals: Queries

Relational databases can be queried by different query languages
+ Relational algebra (based on set and relational operators
+ Relational calculus (based on logic)
+ SQL: computer language which integrates most of the two previous approaches

***Set operators:***

+ Union: Contains all the tuples of R and S or both R and S (duplicates are eliminated)
+ Intesection: All tuples that are in both R and S
+ Difference: R - S => tuples that are in R, but not in s
+ Product: R x S => Concatenation of every tuple of R with every tuple of S


***Relational Operators***

+ Selection (WHERE): selects the tuples that satisfy the specified condition
+ Proyection: Extracts the specified attributes (columns) and eliminaties duplicates
+ Join: defines a relation that contains tuples satisfying some condition from the cartesian product
+ Rename (old, new): changes the name of a column
+ Logical operators: AND, OR, NOT

#### Exercise 1.1 page 24
1. Name (nombre) of all the subjects:
      + Subject [nombre] 
2. Name (nombre) of the subjects with 4 lab groups (GP):
      + (Subject WHERE GP = 4) [nombre]
3. Name (nombre) of lecturers with categoria 'Titular' teaching the subject 11545:
      + (Lecturer x Teaching WHERE categoria = ‘Titular’ AND
cod_asg=‘11545’)[nombre] 
4. Name (nombre) of the lecturers with categoria 'Titular' teaching a subject in the '1A' semester:
    + (((Lecturer(nombre, name\_l) WHERE categoria = ‘Titular’) x(cod_pro) Teaching)
x(cod\_asg) (Subject WHERE semestre =‘1A’)) [name_l]
5. Name of lecturers teaching a subject with 2 GT groups:
    + ((((Teaching[cod\_pro,cod\_asg] x(cod_asg) Subject)
WHERE GT=2) [cod\_pro] x(cod_pro) Lecturer))[nombre] 
6. Name (nombre) of lecturers with categoria='Titular' and with no telephone number
    + (Lecturer WHERE categoria =‘Titular’ AND ISNULL(telefono)) [nombre]

#### Queries using SQL - Exercise 1.2 page 34

```sql
-- 1
Select nombre
from   subject

-- 2
Select nombre
From   subject
where  GP = 4

-- 3
SELECT nombre
FROM   Lecturer, Teaching
WHERE  categoria = ‘Titular’
AND    cod_ag = ‘11545’
AND    Teaching.cod_pro = Lecturer.cod_pro

-- 4
SELECT Lecturer.nombre
FROM   Lecturer, Teaching, Subject
WHERE  categoria = 'Titular' 
AND    semestre  = '1A' 
AND    Teaching.cod_asg = Subject.cod_asg
AND    Teaching.cod_pro = Lecturer.cod_pro

-- 5 
SELECT Lecturer.nombre
FROM   Lecturer, Teaching, Subject
WHERE  Subject.GT= 2
AND    Teaching.cod_asg = Subject.cod_asg
AND    Teaching.cod_pro = Lecturer.cod_pro

-- 6 
SELECT nombre
FROM   Lecturer
WHERE  categoria = 'Titular'
AND    telefono IS NULL
```
--- 
## 3 - The relational data model
### 3.1 Data Types

Depend on the Relational Database Manager System. For example:

- Numeric can be:  Integer, number, real, float...

> Each attribute  (column) can be of a different type - Char(50) means a maximum of 50 chars can be present in that certain column

---

### 3.2 Tuple and Relation

A *tuple schema t* (row) is a set of pairs of the form: 

	t = {(A1, D1), (A2, D2),…, (An, Dn)}

Where:

- {A1, A2,…, An} (n>0) is the set of attribute names in the schema, necessarily different
- {D1, D2,…, Dn} are the domains associated with the abovementioned attributes.

For example:

Person = {(person\_id, integer), (name_char), (address, char)}

These two are correct representations of the Person tuple schema:

T1 - {(person_id, 2544), (name, “Joan Roig”), (address, “Sueca 15”)}
T2 - { (name, “Pep Blau”), (person_id, 9525), (address, “dunno!”)}

> Order does not affect tuples

---

A *relation* is a set of tuples of the same schema

A *relation schema* is the schema of the tuples composing the relation

Notation:
	R (A1:D1, A2: D2,…, An: Dn}
defines a relation R of schema
	{ (A1, D1), (A2, D2),…, (An, Dn)}

Relation schema example:  {(cod\_pro, char(3), (cod_asig, char(5)), (GT, smallint), (GP, smallint))}

**Properties of a relation:** 

- *Degress of a relation:* Number of attributes of its schema
- *Cardinality of a relation:* Number of tuples that compose the relation
- *Compatibiliy:* Two relations R and S are compatible if their schemas are identical

***Example page 54:***

Degree: 3
Cardinality: 4
Compatible with: any other tuple schema with the same names and domains

> REMEMBER: ORDER IN THE TUPLES DOES NOT MATTER (outside the brackets)

> The representation of a relation is a **Table** (the rable is only a *Matrix Representation* of a relation)

Traits which distinguish a relation:

- There can't be repeated tuples in a relation
- There isn't a top-down order in the tuples
- There isn't a left-to-right order in the attributes of a relation

The set of *relation definitions* which represent an information system is called ***relational (logical) schema***

> The content (set of tuples) of the relations of the relational schema is the database

![Captura de pantalla 2017-09-30 a las 20.19.42.png](resources/C03BCDBF8CB2FF5B994012AD5075D952.png =491x330)

### 3.3 Null Value

> A domain is a set of elements which always includes the NULL Value

The correct assignation of a null value is:
+ example **is null**
+ example = null **IS WRONG** 

The **null value** represents tha there is a *not known value*, so we need a **tri-valued logic**:
+ True
+ False
+ Undefined

> The null value applies to all comparison operators (<, >, =, >= ...)

**Evaluation:**
A *v* B (where *v* is a comparison operator) is evaluated as **undefined** if at least one A or B is null;
otherwise it is evaluated to the certainty value of the comparison A *v* B (true/false)

***Null Value with AND, OR, NOT:***

![Captura de pantalla 2017-09-30 a las 20.29.01.png](resources/52B4D78D7C3FBF5426E431DA54372D0B.png =537x291)

### 3.4 Constraints 

**Solutions:**
+ Definition of *domains*
+ *Uniqueness* constraints
+ *Not null* constraints
+ Definition of *primary keys* 
+ Definition of *foreign keys* 
+ *General* integrity constraints

They are specified together with the **database schema**
The responsible for ensuring them is the **DBMS**

+ *cod_pro* identifies lecturers
    + **Primary key (PK)**
+ *nombre* is unique for each object
    + **Uniqueness**
+ The name *(nombre)* of a lecturer must be known
    + **Not null value (NNV)**
+ *cod_asg* in *Teaching* refers to an existing subject
    + **Foreign key (FK)** 

*NNV constraint:*
Not null value constraint specifies:
"There cannot be a tuple in R having the null value in some attribute of K"

![Captura de pantalla 2017-09-30 a las 20.42.08.png](resources/D192DA8DFC034180FA2C9434FEB2888C.png =474x262)

Having an empty space (undefined) in the *nombre* attribute is not allowe and to ensure this we must add the constraint **NNV:{nombre}***

*Uniqueness constraint:*
Uniqueness constraint specifies:
"There cannot be two tuples in R having the same value in all the attributes of K"

![Captura de pantalla 2017-09-30 a las 20.45.35.png](resources/13B009DAF6D6B838AED1D1DAF82C02B7.png =501x269)

There cannot be two tuples in *Subject* with the same value so we add the **UNI** constraint

*Primary Key constraint:*
Given a relation R and PK:{A1...An} the PK constraint specifies:
1. R satisfies a **not null** constraint over PK
2. R satisfies the **uniqueness** constraints over PK

![Captura de pantalla 2017-09-30 a las 20.51.04.png](resources/2BDDB38E9DDDE6299A58A704FA66ACF2.png =477x274)

Applying PK:{cod\_pro} will ensure the NNV and UNI constraints over cod_pro

**Foreign Key**

> The use of foreign keys is the mechanism provided by the relational model to express associations between the objects in a database schema. This mechanism is defined such that these associations, if performed, would be carried out adequately. 

![Captura de pantalla 2017-09-30 a las 21.27.58.png](resources/6A2F88674B61E4C5ADF681BD25C1CC86.png =500x335)

If FK = {Ai} (contains only one attribute) the three types of referential integrity match
*S satisfies the referential integrity constraint* if all tuples in S met: 
+ A1 is NULL, or
+ There is one tuple (and only one) in R with the same value in the f(A1) attributed than A1 in S

![Captura de pantalla 2017-10-02 a las 20.17.55.png](resources/49D400476BA100B694BBCF63962AD876.png =450x286)

#### Referential Integrity
**Applied to FK: {A1,...,Ap} => R**

***Weak RI:**
"If in a tuple of S all the values for the attributes of K have a non null value, then there must exist a tuple in R taking the same values for the attributes of J that the values in the attributes of K"

**Partial RI:**
"If in a tuple of S one or more attributes of K have a non-null value, then there must exist a tuple in R taking the same values for the attributes of J as the values in the non-null attributes of K"

**Complete RI:**
"In a tuple of S all the values must have null value or none of them. In the latter case, there must exist a tuple in R taking the same values for the attributes in J as the values in the attributes of K"

> The type of referential inegirty can be omitted if:
> + The foreign key has only one attribute, or
> + When all of them have a not null constraint
> Since in these cases the three types of referential integrity match

![Captura de pantalla 2017-10-02 a las 20.31.55.png](resources/9F89E98CE0C74A46194BAC6C8F273C29.png =467x290)
![Captura de pantalla 2017-10-02 a las 20.32.03.png](resources/9771FE846801043110DA98C066F5543A.png =477x283)
![Captura de pantalla 2017-10-02 a las 20.32.09.png](resources/E85029563EEDED99568DDDEC5DC61B9E.png =473x301)

#### Violation of the referential integrity

Given two relations R and S such that S has a FK k which refers to the attributes J in R, the only operations which may violate their referential integrity are:
+ Operations over S:
    + Insert a tuple in S
    + Modify the value of K in a tuple of S
+ Operations over R:
    + Delete a tuple in R
    + Modify the value of J in a tuple of R
    
If any of those operations attempts to break the referential integrity, the DBMS aborts the operations (by default). But there are other options, if the FK is previously designed that way:
+ Setting values to null
+ Applying the operation in cascade

The RI defined by a FK is always preserved but can be done in different ways depending on the FK definition:
+ Reject the operation (default)
+ Perform the operation but set some values to null to restore integrity
+ Perform the operation but propagate the action in cascade to restore integrity

> Applied in DELETE and UPDATE

![Captura de pantalla 2017-10-02 a las 21.03.57.png](resources/2B2A931EC567EAB285754F459D77E832.png =466x274)
![Captura de pantalla 2017-10-02 a las 21.04.06.png](resources/596F2E3C8DB1E49B318C335ED19B4DA9.png =462x272)
![Captura de pantalla 2017-10-02 a las 21.04.13.png](resources/6D3AF9E1B5CB8282EDC6F4774DEA0FA4.png =459x282)
![Captura de pantalla 2017-10-02 a las 21.04.25.png](resources/AD552326BFF55793733EA4946F2848DD.png =460x286)

#### General integrity constraints
Constraits which cannot be expressed by the predifined constraints
+ *Static integrity constraints*
    + One table attribute or table constraints (represented by: CHECK)
    + Several tables (expressed by "CREATE ASSERTION or triggers) 
+ *Transition integrity constraints:* triggers

> A database is valid if all the defined integrity constraints are satisfied. The DBMS ensures that every update in teh database generates a new extension which satisfies all the constraints

![Captura de pantalla 2017-10-02 a las 21.10.37.png](resources/BBB5E938DD209D663437D2BD7A4E6395.png =470x278)

## 4 - Constraints and transactions
A **transaction** is a sequence of [manipulation of query] operations which constitues a logical execution unit

> We can put a batch of single operations into a transaction (by using appropriate commands)

Constraints can be disabled during a transaction:
+ Some constraints are evaluated after every single atomic operation (immediate evaluation)
+ Some constraints are evaluated after the transaction is completed (deferred evaluation)

`the database designer is the responsible for determining the mode: immediate/deferred`


































