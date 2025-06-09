import toast from 'react-hot-toast';

// Toast de loading com promise
export const toastLoading = (promise, messages) => {
  return toast.promise(promise, {
    loading: messages.loading || 'Carregando...',
    success: messages.success || 'Sucesso!',
    error: messages.error || 'Erro!',
  });
};


export const toastSuccess = (message, options = {}) => {
  return toast.success(message, {
    duration: 3000,
    icon: '🎉',
    style: {
      background: '#10B981',
      color: '#fff',
    },
    ...options,
  });
};

export const toastError = (message, options = {}) => {
  return toast.error(message, {
    duration: 4000,
    icon: '❌',
    style: {
      background: '#EF4444',
      color: '#fff',
    },
    ...options,
  });
};


export const toastLoginSuccess = (navigate, redirectPath = '/') => {
  const toastId = toast.success('Login realizado com sucesso! Redirecionando...', {
    duration: 3000,
    icon: '🎉',
    style: {
      background: '#10B981',
      color: '#fff',
    },
  });

  setTimeout(() => {
    toast.dismiss(toastId);
    navigate(redirectPath);
  }, 3000);

  return toastId;
};


export const toastWithCountdown = (message, seconds = 3, onComplete) => {
  let timeLeft = seconds;

  const toastId = toast.success(`${message} (${timeLeft}s)`, {
    duration: seconds * 1000,
    icon: '⏳',
  });

  const interval = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      toast.success(`${message} (${timeLeft}s)`, {
        id: toastId,
        duration: seconds * 1000,
        icon: '⏳',
      });
    } else {
      clearInterval(interval);
      toast.dismiss(toastId);
      if (onComplete) onComplete();
    }
  }, 1000);

  return toastId;
};
