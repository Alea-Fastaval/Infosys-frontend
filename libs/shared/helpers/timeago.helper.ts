import TimeAgo from 'javascript-time-ago';

export const timeAgo = (input: number | null | undefined): string => {
  const timeAgo = new TimeAgo('da-DK');
  if (!input) return '';

  const date = input.toString().length <= 10 ? input * 1000 : input;
  return timeAgo.format(new Date(date));
};
