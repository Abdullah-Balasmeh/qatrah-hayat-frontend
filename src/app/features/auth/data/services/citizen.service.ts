import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { map, Observable } from 'rxjs';
import { CitizenResponseModel } from '../../domain/models/citizen-response.model';
import { CitizenResponseDto } from '../dtos/citizen-response.dto';
import { mapCitizenResponseDtoToCitizenResponseModel } from '../mappers/citizen-response-dto-to-citizen-response-model';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private readonly api = inject(ApiService);
  private readonly civilStatusUrl = API_ENDPOINTS.civilStatus.get;

getCivilStatus(nationalId: string): Observable<CitizenResponseModel> {
  const url = this.civilStatusUrl.replace('{nationalId}', nationalId);

  return this.api.get<CitizenResponseDto>(url).pipe(
    map(mapCitizenResponseDtoToCitizenResponseModel)
  );
}
}
