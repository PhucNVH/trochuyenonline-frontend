import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
import { PaginationRequest } from '../dto/commons/PaginationRequest.dto';
import { CreateFeed } from '../dto/feeds/CreateFeed.dto';
import { Feed } from '../dto/feeds/Feed.dto';
import feedService from '../apis/feed,service';

export default class FeedStore {
  feeds: Feed[];
  totalCount: number;

  constructor() {
    this.feeds = [];
    this.totalCount = 0;
    makeObservable(this, {
      feeds: observable,
      totalCount: observable,
      setFeeds: action,
      setTotalCount: action,
    });
  }

  setFeeds(data: Feed[]) {
    this.feeds = data;
  }

  setTotalCount(count: number) {
    this.totalCount = count;
  }

  async get(model: PaginationRequest) {
    const { data, count } = await feedService.get(model);
    this.setFeeds(data);
    this.setTotalCount(count);
  }

  async post(model: CreateFeed) {
    return await feedService.post(model);
  }

  async like(feedId: number) {
    const result = await feedService.like(feedId);
    const updateFeeds = this.feeds.map((f) =>
      f.id === result.id ? { ...f, currentLike: result.currentLike } : f
    );
    this.feeds = updateFeeds;
  }
}

export const FeedStoreContext = createContext(new FeedStore());
