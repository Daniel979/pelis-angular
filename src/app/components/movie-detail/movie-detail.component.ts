import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movieDetail: Movie;
  constructor(public movieService: MovieService,
    public route: ActivatedRoute) { }//inyectamos el servicio MovieService en el componente moviesComponent

  ngOnInit() {//inicia el component
    this.route.params.subscribe( params => {
      this.movieService.getOneMovieDetail(params.id,'es-ES')
      .subscribe((res: Movie) => this.movieDetail = res)
    });
  }

}
