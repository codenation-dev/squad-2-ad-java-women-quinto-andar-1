import swal from "sweetalert";

class UserNotification {
  notifyError = (message) => {
    return swal({
      text: message,
      icon: "error",
    })
  }
}

export const userNotification = new UserNotification()
