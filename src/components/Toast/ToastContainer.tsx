import { useToastStore } from '../../store/toastStore'
import './Toast.scss'
import galochka from '../../assets/galochka.png'
import krest from '../../assets/krest.png'
import i from '../../assets/i.png'




export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)
  

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            {toast.type === 'success' && <span className="toast-icon"><img src={galochka} alt="" className='galochka-toast' /></span>}
            {toast.type === 'error' && <span className="toast-icon"><img src={krest} alt="" className='krest-toast'/></span>}
            {toast.type === 'info' && <span className="toast-icon"><img src={i} alt=""  className='i-toast'/></span>}
            <span className="toast-message">{toast.message}</span>
          </div>
          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
             <img src={krest} alt="" className='krest-toast'/>
          </button>
        </div>
      ))}
    </div>
    
  )
}

