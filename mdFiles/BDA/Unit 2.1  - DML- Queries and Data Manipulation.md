### Introduction to SQL
**SQL:** (Structured Query Language) is a standard language for defining and manipulating a relational database

**DDL:** (Data definition Language) Creation and modification of relational DB schemas
**DML:** (Data manipulation language) Queries and database updates

Example: List pairs stage-mountain pass which have been won by the same cyclist

```sql
select Puerto.nompuerto, Etapa.netapa -- to get the pairs
from  Puerto, Etapa   
where Puerto.netapa = Etapa.netapa    -- to join both tables
and   Puerto.dorsal = Etapa.dorsal    -- the winner
```
> From now on we are going to use simpler names Puerto = P and Etapa = E

*Example page 27*

```sql
select  C.nombre, E.netapa  -- Name of cyclist & Stage number
from    Etapa E, Ciclista C
where   E.km > 150          -- More than 150km long
and     E.dorsal = C.dorsal -- To join the tables and obtain the winners
```
*Example page 28*

```sql
select  C2.nombre
from    Ciclista C1, Ciclista C2
where   C1.nombre = "Miguel Induráin"
and     C1.nomeq  = C2.nomeq          -- Nombre equipo
and     C1.edad   > C2.edad           -- Younger than him
```
*Example page 36*

```sql
select P1.nompuerto
from   Puerto P1
where  P1.altura > (select  AVG(P.altura)         -- between brackets its the subquerry to 
                    from    Puerto P              -- obtain "mean of the height of all 2nd
                    where   P.categoria = "2");   -- category mountain passes"
```
> P1.altura can be compared with AVG(P.altura) because AVG(P.altura) returns only one value the mean

*Example page 41*

```sql
select E.salida, E.llegada
from   Etapa E                         -- The IN operator allows you to specify multiple
where  E.netapa IN (select P1.netapa   -- values in a WHERE clause  
                    from    Puerto P1   
                    where   P1.pendiente = (select MAX(P2.pendiente) from Puerto P2);
                   );
```
*another solution (example page 41)*

```sql
select    distinct E.salida, E.llegada
from      Etapa E, Puerto P
where     E.netapa = P.etapa
and       pendiente = (select MAX(pendiente)
                       from Puerto);
```
*Example page 43*

```sql
select DISTINCT E.director
from   Equipo E, 
where  E.nomeq IN (select C.nomeq
                   from   Ciclist C 
                   where  C.nombre LIKE 'A%';)  -- Todos los que empiezan por A
```
*Example page 44*

```sql
select E.netapa
from   Etapa E
where  E.dorsal IN (select C.dorsal
                    from   Ciclista C
                    where  C.nomeq IN (select E.nomeq
                                       from   Equipo E
                                       where  E.director LIKE 'A%'))
```
*Example page 48*

```sql
select nombre
from   Ciclista
where  dorsal NOT IN (select  dorsal
                      from    Etapa)
```
*Example page 54*

```sql
select c.dorsal
from   Ciclista c
where  NOT EXISTS (select *
                   from   Maillot m
                   where  NOT EXISTS (select *
                                      from   Llevar l
                                      where  l.codigo = m.codigo
                                      and    l.dorsal = c.dorsal))
```
*Example page 55*

```sql
select c.name
from   Ciclist c, Etapa e
where  c.dorsal = e.dorsal
and NOT EXISTS (select *
                from   Puerto p
                where  p.netapa = e.netapa
                and    p.dorsal <> C.dorsal)
and EXISTS  (select *
            from puerto p2
            where p2.netapa = e.etapa
            
-- becayse threr could be some stage with no mountain passes
```
*Example page 69*

```sql
select c.nomeq, AVG(c.edad)
from   Ciclista c
where  c.edad > 25
group by c.nomeq
having 8 > (select count(dorsal)  -- ellos hacen count(*), pero valen ambas
            from Ciclista c2
            where c.nomeq = c2.nomeq)
```
*Example page 71*

```sql
select c.name, COUNT(p.nompuerto)
from Ciclista c, Puerto p
where p.dorsal = c.dorsal
group by c.dorsal, p.nombre
having 10 < (select avg(p1.pendiente)
             from   Puerto p1
             where    p1.dorsal = c.dorsal)
```
*Example page 72*

```sql
select c.nombre, Count(e.netapa)
from   Ciclista c, Etapa e
where  c.dorsal = e.dorsal
group by c.dorsal, c.nombre     -- en teoria si el nombre es el main select tienes que
having 5 < (select count(*)               -- añadirlo en el GROUP BY
            from   Ciclista c2
            where  c2.nomeq = c.nomeq)
            
-- another solution

select C.nombre, count(*)
from   ciclista C, Etapa E
where  C.dorsal = E.dorsal
and    5 < (select count(*)
            from   Ciclista C2
            where  C2.nomeq = C.nomeq)
group by c.nombre, c.dorsal
```
*Example page 91*

```sql
Select c.dorsal, c.nombre, l.codigo, l.netapa
from   Ciclista c left join Llevar l 
       on c.dorsal = l.dorsal

-- Usar el left join te deja seleccionar todos los ciclistas y los que no cumplen la condicion te los deja a null
```
*Example page 92*

```sql
select e.nomeq, count(*)
from   Ciclista c right join Equipo e
       on e.nomeq = c.nomeq
group by e.nomeq
```


 



























