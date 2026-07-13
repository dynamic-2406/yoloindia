import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-saffron-500 hover:bg-saffron-600 text-white shadow-lg hover:shadow-saffron-300/40',
  secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm',
  outline: 'border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50',
  ghost: 'text-saffron-600 hover:bg-saffron-50',
  dark: 'bg-dark text-white hover:bg-gray-900',
  white: 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </motion.button>
  );
};

export default Button;
