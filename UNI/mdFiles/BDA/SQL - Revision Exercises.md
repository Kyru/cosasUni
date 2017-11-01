```sql
-- List the name of the youngest cyclist

select c.nombre 
from ciclista c
where c.edad <= ALL(Select edad
                    from ciclista)
                    
-- List the value of the attribute netapa and the departure city for those 
-- stages with no mountain passes

select e.netapa, e.salida
from   etapa e, puerto p
where  e.netapa NOT IN (select etapa
                        from puerto)

-- List the name of the departure and the arrival of the stages where the
-- steepest mountain passes ("puerto") are located

select e.salida, e.llegada
from   Etapa e
where  e.netapa = (select p.netapa
                   from   puerto p
                   where  p.pendiente <= ALL(select pendiente
                                             from puerto)
                                             
select e.salida, e.llegada
from etapa e, puerto p
where e.netapa = p.netapa 
AND p.pendiente

-- List the name of the cyclist who belong to a team which has more than five cyclist and have also won one or more stages. Please indicate the number of stages he has won --

select c.nombre, count(e.dorsal)
from ciclista c, etapa e
group by c.nomeq, c.nombre
where c.dorsal = e.dorsal
having 5 < (select count(nomeq)
            from equipo eq, etapa e
            where c.nomeq = eq.nomeq)

-- List the name of all cyclists who belong to a team which has more than five cyclists indicating how many stages he has won --

select c.nombre, count(e.dorsal)
from ciclista c left join etapa e on (c.dorsal = e.dorsal)
where 5 < (select count(*)
           from ciclista c2
           where c2.nomeq = c.nomeq)
group by c.nombre, c.dorsal

-- List the cyclist number (dorsal) and the name of the cyclist who have not worn all the jerseys (maillots) worn by the cyclist with number 20 --

select c.dorsal, c.nombre
from ciclista c,  a
where

-- List the name of the teams and the average age of the cyclist of those teams who have the highest average age of all the teams --

select
from
where

```



















