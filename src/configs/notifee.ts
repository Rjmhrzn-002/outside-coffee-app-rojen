import notifee, {
  AuthorizationStatus,
  TriggerType,
  Notification,
  AndroidImportance,
  EventType,
  TimestampTrigger,
} from '@notifee/react-native';

class Notifications {
  constructor() {
    notifee.onForegroundEvent(({type, detail}: {type: any; detail: any}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          this.handleNotificationOpen(detail.notification as Notification);
          break;
        case EventType.ACTION_PRESS:
          break;
      }
    });
  }

  public async sendWelcomeNotification({
    name,
  }: {
    name: string;
  }): Promise<string | undefined> {
    try {
      const hasPermissions = await this.checkPermissions();

      if (!hasPermissions) {
        console.log('❌ No notification permissions');
        return '';
      }
      console.log(' Permissions granted');

      // Check if welcome channel already exists
      const channels = await notifee.getChannels();
      console.log('Available channels:', channels);

      const welcomeChannel = channels.find(channel => channel.id === 'welcome');

      if (welcomeChannel) {
        console.log('🚀 Welcome notification already sent previously');
        return undefined;
      }

      // Create the welcome channel
      console.log('Creating welcome notification channel...');
      await notifee.createChannel({
        id: 'welcome',
        name: 'Welcome Notifications',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });

      // Schedule notification 5 seconds in the future
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: Date.now() + 10000,
      };

      const notificationId = Date.now().toString();

      await notifee.createTriggerNotification(
        {
          id: notificationId,
          title: `🎊 Welcome ${name}, to the Outside Coffee!🎉 `,
          body: `We're glad to have you here. Enjoy your experience!`,
          android: {
            channelId: 'welcome',
            pressAction: {
              id: 'default',
            },
            smallIcon: 'ic_notification',
            importance: AndroidImportance.HIGH,
          },
          ios: {
            categoryId: 'welcome',
          },
        },
        trigger,
      );

      // Debugging: Fetch and log all scheduled notifications
      const scheduledNotifications = await notifee.getTriggerNotifications();

      return notificationId;
    } catch (error) {
      console.error('❌ Error scheduling notification:', error);
      return undefined;
    }
  }

  public handleNotificationOpen(notification: Notification) {
    const {data} = notification;
    console.log('Notification received: foreground', data);
  }

  public async checkPermissions() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
      return true;
    } else {
      console.log('User declined permissions');
      return false;
    }
  }
}

export default new Notifications();
