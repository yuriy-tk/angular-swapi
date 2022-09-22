import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteListItemComponent } from './infinite-list-item/infinite-list-item.component';
import { InfiniteListItemPlaceholderComponent } from './infinite-list-item-placeholder/infinite-list-item-placeholder.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    InfiniteListItemComponent,
    InfiniteListItemPlaceholderComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [InfiniteListItemComponent, InfiniteListItemPlaceholderComponent],
})
export class SharedModule {}
