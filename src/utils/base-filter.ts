import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class BaseFilter {}

export class NameFilter extends BaseFilter {
  @ApiModelProperty({ name: 'name', type: String })
  public name: string;
}
