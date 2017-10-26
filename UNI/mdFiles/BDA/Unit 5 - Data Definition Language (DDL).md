*example page 31*

```sql
create trigger change_rol
  after update of papel on Actua
  for each row
  when (old.papel<>new.papel)
begin
  if(:old.papel = 'Principal'
  then update Pelicula set principales = principales-1
      where cod_peli = :old.cod_peli);
  else
    if(:new.papel = 'Principal)
    then update Pelicula SET principales = principales+1
        where cod_peli = :new_peli);
    end if;
  end if;
end;
```