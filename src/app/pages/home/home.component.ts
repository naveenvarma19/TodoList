import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FeaturesComponent, AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
