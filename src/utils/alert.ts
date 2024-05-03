import Swal, { SweetAlertIcon } from 'sweetalert2';

interface AlertProps {
    icon: SweetAlertIcon;
    text: string;
    cancelButton?: boolean;
    confirmText?: string;
    cancelButtonText?: string;
}

function Alert({ 
    text, 
    icon, 
    cancelButton, 
    confirmText,
    cancelButtonText 
}: AlertProps) {
    return Swal.fire({
        html: text,
        icon,
        showCancelButton: cancelButton,
        cancelButtonColor: '#d33',
        cancelButtonText: cancelButtonText ?? 'Cancel',
        confirmButtonColor: '#3085d6',
        confirmButtonText: confirmText ?? 'OK'
    });
}

export default Alert;