type Props = {
  className?: string,
  isActive: boolean,
  title?: string,
  onClick: () => void,
}

function Button({ className = '', isActive, title, onClick }: Props) {
  const activeClass = isActive ? 'shadow-inner shadow-black' : '';

  return (
    <button
      className={`w-14 h-14 bg-neonDarkerPurple hover:bg-neonPurple active:opacity-30 ${activeClass} rounded-lg bg-no-repeat bg-cover transition-all ${className}`}
      title={title}
      type="button"
      onClick={onClick}
    />
  );
}

export default Button;
