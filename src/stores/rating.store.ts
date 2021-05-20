import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
import ratingService from '../apis/rating.service';
import {
  ChatbotRating,
  CreateUpdateRatingRequest,
  GetRatingRequest,
} from '../dto/rating/getRatingRequest.dto';

export default class RatingStore {
  score: number;
  scoreChatbot: number;

  constructor() {
    this.score = -1;
    this.scoreChatbot = -1;
    makeObservable(this, {
      score: observable,
      scoreChatbot: observable,
      setScore: action,
      setScoreChatbot: action,
    });
  }

  setScore(score: number) {
    this.score = score;
  }

  setScoreChatbot(scoreChatbot: number) {
    this.scoreChatbot = scoreChatbot;
  }

  async get(model: GetRatingRequest) {
    const data = await ratingService.get(model);
    this.setScore(data);
  }

  async post(model: CreateUpdateRatingRequest) {
    await ratingService.post(model);
  }

  async getChatbot() {
    const data = await ratingService.getChatbot();
    this.setScoreChatbot(data);
  }

  async putChatbot(model: ChatbotRating) {
    await ratingService.putChatbot(model);
  }
}

export const RatingStoreContext = createContext(new RatingStore());
