import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

import { AlbumRoles } from '../../models/albumRoles.model';
import { Album } from '../../models/album.model';
import { GalleryService } from '../../services/pages/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges, OnDestroy {
  title = 'Photo Albums';
  albums: Observable<Album[]>;
  newAlbums: Album[] = [];
  navigationSubscription;

  constructor(
    private galleryService: GalleryService,
    private router: Router,
    private route: ActivatedRoute) {
    this.navigationSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('gallery navigation end')
        this.galleryAccessible();
      }
    });
  }

  ngOnInit() {
    //console.log('gallery on init')
  }

  ngOnChanges() {
    //this.galleryAccessible();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  private galleryAccessible() {
    console.log('checking access to gallery: ', this.route.snapshot.params['type']);

    if (this.galleryService.galleryAccessible(AlbumRoles[this.route.snapshot.params['type']])) {
      console.log('has access gallery: ', this.route.snapshot.params['name']);

      this.title = this.route.snapshot.params['name'] + ' Albums';
      this.galleryService.albums.subscribe(albums => this.newAlbums = albums);
    }
    else {
      console.log('route home from gallery');
      this.router.navigate(['/home']);
    }
  }

}
