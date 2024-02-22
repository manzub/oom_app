type MindfulQuote = {
  title: string
  activity: string
  action: string
  action_type: string
  action_start: string
  activity_len: number
}

type AppUser = {
  userId: string,
  notifications: { message: string, is_read: boolean, created: string }[],
  conversations: { convId: string, messages: string[] }[]
}