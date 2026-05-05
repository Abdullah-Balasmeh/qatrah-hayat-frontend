import { PagedResultDto } from '../../../../core/dtos/paged-result.dto';
import { PagedResultModel } from '../../../../core/models/paged-result.model';

export function mapPagedResultDtoToModel<TDto, TModel>(
  dto: PagedResultDto<TDto>,
  itemMapper: (item: TDto) => TModel
): PagedResultModel<TModel> {
  return {
    items: dto.items.map(itemMapper),
    pageNumber: dto.pageNumber,
    pageSize: dto.pageSize,
    totalCount: dto.totalCount,
    totalPages: dto.totalPages,
  };
}