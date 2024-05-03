import Swal, { SweetAlertIcon } from 'sweetalert2';

interface AlertProps {
    icon: SweetAlertIcon;
    text: string;
    cancelButton?: boolean;
    confirmText?: string;
    cancelButtonText?: string;
    data_cy: string;
}

function Alert({ 
    text, 
    icon, 
    cancelButton, 
    confirmText,
    cancelButtonText,
    data_cy
}: AlertProps) {
    return Swal.fire({
        html: text,
        icon,
        showCancelButton: cancelButton,
        cancelButtonColor: '#d33',
        cancelButtonText: cancelButtonText ?? 'Cancel',
        confirmButtonColor: '#3085d6',
        confirmButtonText: confirmText ?? 'OK',
        didRender: () => {
            const sweetAlertModal = document.querySelector('.swal2-popup');
            sweetAlertModal?.setAttribute('data-cy', data_cy)
        },
        preConfirm: () => {
            return true
        },
        willClose: () => {
            const cancelButton = document.querySelector('.swal2-cancel');
            cancelButton?.setAttribute('data-cy', 'modal-delete-cancel-button')
        }
    });
}

export default Alert;