export interface GetRatingRequest {
  userId?: number;
  isChatbot: boolean;
  conversationName: string;
}

export interface CreateUpdateRatingRequest {
  userId?: number;
  score: number;
  isChatbot: boolean;
  conversationName: string;
}

export interface ChatbotRating {
  score: number;
}
