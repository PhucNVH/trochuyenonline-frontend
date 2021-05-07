import { action, makeObservable, observable } from 'mobx';
import React from 'react';
import notificationService from '../apis/notification.service';
import { newNotificationFormInit } from '../dto/commons/notification.constants';

export interface NotificationDto {
  title: string;
  body: string;
  source: string;
}

export interface NotificationInstanceDto {
  id: number;
  createdDate: string;
  notification: NotificationDto;
  isRead: boolean;
}

export interface NotificationTableDto {
  id: number;
  createdDate: string;
  title: string;
  body: string;
  source: string;
}

export interface NewNotificationDto {
  title: string;
  body: string;
}

export interface NotificationListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export default class NotificationStore {
  notificationForm: NewNotificationDto;
  notificationsTableList: NotificationTableDto[];
  totalCount: number;
  unreadCount: number;
  notifications: NotificationInstanceDto[];
  currentTake: number;
  total: number;

  constructor() {
    this.notificationForm = newNotificationFormInit;
    this.notificationsTableList = [];
    this.totalCount = 0;
    this.unreadCount = 0;
    this.notifications = [];
    this.currentTake = 5;
    this.total = 0;
    makeObservable(this, {
      notificationForm: observable,
      notificationsTableList: observable,
      totalCount: observable,
      unreadCount: observable,
      notifications: observable,
      currentTake: observable,
      total: observable,
      getNotiList: action,
      setRead: action,
      setNotificationForm: action,
      resetMotificationForm: action,
      addNotification: action,
      getNotifications: action,
    });
  }

  async getNotiList() {
    const result = await notificationService.getList({
      skip: 0,
      take: this.currentTake,
    });
    this.notifications = result[0];
    this.total = result[1];
    this.unreadCount = result[2];
  }

  async setRead(id: number) {
    await notificationService.setRead(id);
    this.getNotiList();
  }

  async setNotificationForm(data: any) {
    this.notificationForm.title = data.title;
    this.notificationForm.body = data.body;
  }

  async resetMotificationForm() {
    this.notificationForm = newNotificationFormInit;
  }

  async addNotification() {
    const data = await notificationService.addNotification(
      this.notificationForm
    );
    return data;
  }

  // getNotifications()
  // Get notification for grid
  // Notice: this isn't a function for button notification on top bar

  async getNotifications(criteria: NotificationListDto) {
    const result = await notificationService.getNotifications(criteria);
    if (result) {
      this.notificationsTableList = result.data?.result[0];
      this.totalCount = result.data?.result[1];
    }
  }

  getNotiSchedule() {
    this.getNotiList();
    setInterval(() => this.getNotiList(), 60000);
  }
}

export const NotificationStoreContext = React.createContext(
  new NotificationStore()
);
