import { useGetUserListQuery, useGetUserQuery } from '../services/userApi';

export const useUser = () => {
  const { data: UserList, error: listError, isLoading: isListLoading } = useGetUserListQuery();
  const { data: User, error: detailsError, isLoading: isDetailsLoading } = useGetUserQuery();

  return {
    UserList,
    User,
    listError,
    detailsError,
    isListLoading,
    isDetailsLoading,
  };
};
