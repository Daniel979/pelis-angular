import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  public movies: Movie[];
  public page: number = 1;
  public paramsSubscription: Subscription;
  public category: string;
  constructor(public movieService: MovieService,
    public route: ActivatedRoute) { }//inyectamos el servicio MovieService en el componente moviesComponent

  ngOnInit() {//inicia el component
    this.paramsSubscription = this.route.paramMap.subscribe(paramsMap => {//nos suscribimos a cambios en los parámetros de la url ej: /movie/movies o /movie/upcoming
      this.category = paramsMap.get('category');
      this.getMovies(paramsMap.get('category'));// /upcoming o /movies
    })
  }
  getMovies(category: string) {
    this.movieService.getMovies(category, 'es-ES', String(this.page)).subscribe(
      res => this.movies = res['results'],
      error => console.log(error))
  }
  getNext() {
    this.page++;
    this.getMovies(this.category);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  getPrevious() {
    if(this.page>1) {
      this.page--;
      this.getMovies(this.category);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
    console.log(this.paramsSubscription);

  }
}
