import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  public paramsSubscription:Subscription;
  public movies: object[];
  public page:number=0;
  constructor(public movieService: MovieService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription=this.route.paramMap.subscribe(paramsMap=>{
      this.getMovies('top_rated');
    })
  }
  getMovies(category:string) {
    this.movieService.getMovies(category, 'es-Es', '1').subscribe(
      res=>this.movies=res['results'],
      error=>console.log(error)
    );
  }
  ngOnDestroy()
  {
    this.paramsSubscription.unsubscribe();
    console.log(this.paramsSubscription);
  }

}
