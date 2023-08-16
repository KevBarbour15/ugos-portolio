import Swal from "sweetalert2";

function successNotification(title, text) {
  Swal.fire({
    position: "center",
    title: title,
    text: text,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}

function imageSuccessNotification(title, url) {
  Swal.fire({
    position: "center",
    title: title,
    imageUrl: url,
    imageHeight: 200,
    imageAlt: "Custom image",
    showConfirmButton: false,
    timer: 1500,
  });
}

function errorNotification(title, text) {
  Swal.fire({
    position: "center",
    title: title,
    text: text,
    icon: "error",
    showConfirmButton: false,
    timer: 1500,
  });
}

export { successNotification, imageSuccessNotification, errorNotification };
