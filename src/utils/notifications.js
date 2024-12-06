import toast from 'react-hot-toast';
export const showSuccess = (message) => {
    toast.success(message, {
        duration: 3000,
        style: {
            background: '#10B981',
            color: '#fff',
        },
    });
};
export const showError = (message) => {
    toast.error(message, {
        duration: 4000,
        style: {
            background: '#EF4444',
            color: '#fff',
        },
    });
};
export const showInfo = (message) => {
    toast(message, {
        duration: 3000,
        style: {
            background: '#3B82F6',
            color: '#fff',
        },
    });
};
