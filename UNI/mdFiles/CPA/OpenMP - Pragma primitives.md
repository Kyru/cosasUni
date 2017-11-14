```c++
omp_get_thread_num()  //thread ID
omp_get_num_threads() //number of threads

#pragma omp parallel 
#pragma omp for [schedule (...)]
// with these two you can use nowait if()
#pragma omp sections
#pragma omp single 
// ...
```
**Schedules:** private(\_), shared(_), reduction(op, _), lastprivate, firstprivate

```c++
#pragma omp critical [(name)]
#pragma omp atomic
#pragma omp barrier
#pragma omp for ordered
#pragma omp ordered
#pragma omp master
```