import NotificationContext from '../notificationContext.js'

export default class HeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super()

    this.name = name
    this.age = age
  }

  isValid() {
    if (this.age < 20) {
      this.addNotification('hero is too young')
    }

    if (this.name?.length < 4) {
      this.addNotification('name length must be greater than 4')
    }

    return !this.hasNotifications()
  }

  // ? this.notifications
}
