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
            const sweetAlertModal = document.querySelector('.swal2-container');
            const cancelButton = document.querySelector('.swal2-cancel');
            const confirmButton = document.querySelector('.swal2-confirm');
            sweetAlertModal?.setAttribute('data-cy', data_cy)
            cancelButton?.setAttribute('data-cy', 'modal-delete-cancel-button')
            confirmButton?.setAttribute('data-cy', 'modal-delete-confirm-button')
        },
    });
}

export default Alert;