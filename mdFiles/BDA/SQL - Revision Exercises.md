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
```