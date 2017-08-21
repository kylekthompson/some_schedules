import { postCreate } from '../../api/companies';
import {
  ICompanyForCreation,
  ICreatedCompany
} from '../../api/companies/types';
import { IAPIResponse } from '../../api/shared/types';
import { IThunkAction } from '../types';
import * as actionTypes from './actionTypes';

export const requestCreation = (company: ICompanyForCreation): IThunkAction => async (dispatch, _getState) => {
  dispatch({ type: actionTypes.REQUEST_COMPANY_CREATION });

  try {
    const companyResponse: IAPIResponse<ICreatedCompany> = await postCreate(company);

    if (companyResponse.status < 400) {
      dispatch({ type: actionTypes.RECEIVE_COMPANY_CREATION_SUCCESS, payload: { ...companyResponse } });
    } else {
      dispatch({ type: actionTypes.RECEIVE_COMPANY_CREATION_FAILURE, payload: { ...companyResponse } });
    }
  } catch (e) {
    dispatch({
      payload: {
        errors: {
          '': ['An unexpected error occurred.'],
        },
        status: 500,
      },
      type: actionTypes.RECEIVE_COMPANY_CREATION_FAILURE,
    });
  }
};
