export type GetUsersBySearchRequest = {
  page: number;
  limit: number;
  order: 'ASC';
  query: {
    name: string;
    exclude_logged_user: true;
    email: string;
    phone_number: string;
    username: string;
  };
};
