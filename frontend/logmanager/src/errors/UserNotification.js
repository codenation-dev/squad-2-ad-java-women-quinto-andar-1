import swal from "sweetalert";

class UserNotification {
  notifyError = (message) => {
    console.log('entrou')
    return swal({
      text: message,
      icon: "error",
    })
  }
}

export const userNotification = new UserNotification()
