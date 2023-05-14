import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: false,
});

export function successToast(message) {
  Toast.fire({
    icon: 'success',
    title: message,
  });
}

export function failToast(message) {
  Toast.fire({
    icon: 'warning',
    title: message,
  });
}
