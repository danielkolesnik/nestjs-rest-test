import { BaseFilter, NameFilter } from './base-filter';
import { ApiProperty } from '@nestjs/swagger';
import { UserViewDTO } from '../users/users.dto';
import { FilteredRequest } from './filtered-request';

export class FilteredResponse<Filter extends BaseFilter, Entity> {
  filter: Filter;

  items: Entity[];

  @ApiProperty({
    type: Number,
    minimum: 1,
    example: 10,
    description: 'The amount of items on the page',
  })
  size: number;

  @ApiProperty({
    type: Number,
    minimum: 0,
    example: 0,
    description: 'Page number',
  })
  page: number;

  @ApiProperty({
    type: Number,
    minimum: 0,
    example: 123,
    description: 'Total amount of items',
  })
  total: number;

  @ApiProperty({
    type: Number,
    description: 'Total amount of pages',
  })
  pages: number;

  // TODO implement sort parameter { field: string, order: enum }
  // sort: Sort;

  constructor() {
    this.page = 0;
    this.size = 10;
    // this.sort = new BaseSort(); // id asc
  }

  fromRequest(filteredRequest: FilteredRequest<Filter>) {
    this.page = filteredRequest.page;
    this.size = filteredRequest.size;
    this.filter = filteredRequest.filter;
    // this.sort = filteredRequest.sort;
  }

  fromRequestAndPaged(
    filteredRequest: FilteredRequest<Filter>,
    pagedResult: [Entity[], number],
  ) {
    this.fromRequest(filteredRequest);
    if (pagedResult) {
      this.items = pagedResult[0];
      this.total = pagedResult[1];
      this.setPages();
    }
  }

  private setPages() {
    let pages = 0;

    // Calculate total number of pages
    if (this.total > 0 && this.size > 0) {
      pages = Math.round(this.total / this.size);

      if (this.total % this.size > 0) pages++;
    }

    this.pages = pages;
  }
}

// Nestjs Swagger don't understand generics... (so we need to implement FilteredResponse for each filter-entity pair)
export class UsersFilteredResponse extends FilteredResponse<
  NameFilter,
  UserViewDTO
> {
  @ApiProperty({ type: NameFilter })
  filter: NameFilter;
  @ApiProperty({ type: [UserViewDTO] })
  items: UserViewDTO[];
}
