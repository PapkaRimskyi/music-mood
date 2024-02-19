type Props = {
  className?: string,
  isActive: boolean
  onClick: () => void,
}

function Button({ className = '', isActive, onClick }: Props) {
  const activeClass = isActive ? 'shadow-inner shadow-black' : '';

  return (
    <button
      className={`w-14 h-14 bg-neonDarkerPurple hover:bg-neonPurple active:opacity-30 ${activeClass} rounded-lg bg-no-repeat bg-cover transition-all ${className}`}
      type="button"
      onClick={onClick}
    />
  );
}

export default Button;
