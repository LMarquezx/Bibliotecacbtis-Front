import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BooksComponent } from './books/books.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PrestamoComponent } from './prestamo/prestamo.component';
import { LibroPrestamoComponent } from './libro-prestamo/libro-prestamo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    MatPaginatorModule
  ],
  declarations: [
    BooksComponent,
    PrestamoComponent,
    LibroPrestamoComponent,
    AppBadgeComponent,
    AppChipsComponent,
    AppListsComponent,
    AppMenuComponent,
    AppTooltipsComponent,
  ],
})
export class UicomponentsModule {}
