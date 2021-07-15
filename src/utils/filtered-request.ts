import { BaseFilter, NameFilter } from './base-filter';
import { ApiProperty } from '@nestjs/swagger';

export class FilteredRequest<Filter extends BaseFilter> {
  filter: Filter;

  @ApiProperty({ type: Number, minimum: 1, example: 10 })
  size: number;

  @ApiProperty({ type: Number, minimum: 0, example: 0 })
  page: number;

  // TODO implement sort parameter { field: string, order: enum }
  // sort: Sort;

  constructor() {
    this.page = 0;
    this.size = 10;
    // this.sort = new BaseSort(); // id asc
  }
}

// Nestjs Swagger don't understand generics... (so we need to implement FilteredRequest for each filter)
export class NameFilteredRequest extends FilteredRequest<NameFilter> {
  @ApiProperty({ type: NameFilter, required: false })
  filter: NameFilter;
}
