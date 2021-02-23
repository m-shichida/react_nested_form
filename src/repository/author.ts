import { axiosInstance } from './axiosInstance';
import { SuccessResult, ErrorResult } from '../types/api';

const authors_url = '/api/authors'

export default {
  async getAuthors(): Promise<SuccessResult<any> | ErrorResult> {
    const response = await axiosInstance.get(authors_url)
                                        .then((response) => {
                                          if (response.status === 200) {
                                            return {
                                              error: false,
                                              data: response?.data,
                                              errorMessages: [],
                                            }
                                          } {
                                            return {
                                              error: false,
                                              data: null,
                                              errorMessages: response?.data,
                                            }
                                          }
                                        })
                                        .catch(() => {
                                          return {
                                            error: true,
                                            data: null,
                                            errorMessages: ['システムエラー']
                                          }
                                        });
    return response;
  },
}
