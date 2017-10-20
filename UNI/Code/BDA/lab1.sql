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

-- 11

select p.cod_peli, p.titulo
from cs_pelicula p, cs_actor a, cs_actua ac
where p.cod_peli = ac.cod_peli
and ac.cod_act = a.cod_act
and a.nombre = p.director
order by p.titulo;

-- 12

select p.cod_peli, p.titulo
from cs_pelicula p, cs_clasificacion c, cs_genero g
where p.cod_peli = c.cod_peli
and c.cod_gen = g.cod_gen
and g.nombre = 'Comedia'
order by p.titulo;

-- 13

select p.cod_peli, p.titulo
from cs_pelicula p, cs_libro l
where p.cod_lib = l.cod_lib
and l.anyo < 1950
order by p.titulo;

-- 14

select distinct pa.cod_pais, pa.nombre
from cs_pais pa, cs_actor a, cs_actua ac, cs_pelicula p, cs_clasificacion c, cs_genero g
where pa.cod_pais = a.cod_pais
and a.cod_act = ac.cod_act
and p.cod_peli = ac.cod_peli
and p.cod_peli = c.cod_peli
and c.cod_gen = g.cod_gen
and g.nombre = 'Comedia';

-- 3.3 Queries with subqueries

-- 15 (rewrite queries 11, 12, 13, 14 with subqueries)

select p.cod_peli, p.titulo
from cs_pelicula p
where p.director IN (
    select a.nombre
    from cs_actor a
    where a.cod_act IN (
        select x.cod_act
        from cs_actua x
        where x.cod_peli = p.cod_peli
    )
) order by p.titulo;
