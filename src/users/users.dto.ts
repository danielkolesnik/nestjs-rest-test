import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.model';

export class UserCreateDTO {
  @ApiProperty({ required: true })
  public name: string;

  static of(entity: User): UserCreateDTO {
    const itemDTO = new UserCreateDTO();

    itemDTO.name = entity.name;

    return itemDTO;
  }
}

export class UserEditDTO extends UserCreateDTO {
  @ApiProperty({ required: true })
  public id: number;

  static of(entity: User): UserEditDTO {
    const itemDTO = new UserEditDTO();

    itemDTO.id = entity.id;
    itemDTO.name = entity.name;

    return itemDTO;
  }
}

export class UserViewDTO extends UserEditDTO {
  @ApiProperty({ readOnly: true })
  public createdAt: Date;

  @ApiProperty({ readOnly: true })
  public updatedAt: Date;

  static of(entity: User): UserViewDTO {
    const itemDTO = new UserViewDTO();

    itemDTO.id = entity.id;
    itemDTO.name = entity.name;
    itemDTO.createdAt = entity.createdAt;
    itemDTO.updatedAt = entity.updatedAt;

    return itemDTO;
  }
}
