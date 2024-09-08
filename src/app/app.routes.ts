import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SdpviewComponent } from './sdpview/sdpview.component';

export const routes: Routes = [
    {
        path: '',
        component: SdpviewComponent
    }
];
