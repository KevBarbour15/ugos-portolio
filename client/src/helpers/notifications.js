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

function confirmDelete() {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function successDelete() {
  Swal.fire("Deleted!", "success");
}
export {
  successNotification,
  imageSuccessNotification,
  errorNotification,
  confirmDelete,
  successDelete,
};