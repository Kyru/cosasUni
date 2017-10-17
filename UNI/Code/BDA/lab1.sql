-- BDA LAB 1 --
-- 3.1 Queries using one single relation

-- 1

select distinct a.cod_pais
from cs_actor a
order by a.cod_pais;

-- 2

select p.cod_peli, p.titulo
from cs_pelicula p
where p.anyo < 1970
and cod_lib is null
order by p.titulo;

-- 3

select a.nombre
from   cs_actor a
where a.nombre like '%John%';

-- 4

select p.cod_peli, p.titulo
from   cs_pelicula p
where  p.duracion > 120
and    p.anyo > 1980
and    p.anyo <= 1989;

-- 5 

select p.cod_peli, p.titulo
from   cs_pelicula p
where  p.director like '%Pakula'
and    p.cod_lib is not null;

-- 6

select count(*)
from   cs_pelicula p
where  p.duracion > 120
and    p.anyo > 1980
and    p.anyo <= 1989;

-- 7 

select count(distinct c.cod_peli)
from cs_clasificacion c
where c.cod_gen = 'BB5'
or    c.cod_gen = 'GG4'
or    c.cod_gen = 'JH6';

-- 8

select min(l.anyo)
from cs_libro l;

-- 9

select avg(p.duracion)
from cs_pelicula p
where p.anyo = 1987;

-- 10

select sum(p.duracion)
from cs_pelicula p
where p.director = 'Steven Spielberg';

-- 3.2 Queries using more than one relation















